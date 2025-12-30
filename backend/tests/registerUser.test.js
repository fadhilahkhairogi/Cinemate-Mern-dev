import { registerUser } from '../controllers/authController.js'
import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import { jest } from '@jest/globals'

jest.mock('../models/user.js')
jest.mock('bcryptjs')

describe('White Box Testing - registerUser', () => {
  let req, res

  beforeEach(() => {
    jest.clearAllMocks()

    req = { body: {} }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
  })

  test('[Path 1] Return 400 jika password kurang dari 8 karakter', async () => {
    req.body = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@test.com',
      password: '123',
    }

    await registerUser(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        errors: expect.arrayContaining([
          expect.objectContaining({ msg: 'Password should be at least 8 characters' }),
        ]),
      })
    )
  })

  test('[Path 2] Return 409 jika email sudah ada di DB', async () => {
    req.body = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'exist@test.com',
      password: 'password123',
    }

    User.findOne.mockResolvedValue({ email: 'exist@test.com' })

    await registerUser(req, res)

    expect(res.status).toHaveBeenCalledWith(409)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        errors: expect.arrayContaining([
          expect.objectContaining({ msg: 'Email is already registered' }),
        ]),
      })
    )
  })

  test('[Path 3] Return 201 jika registrasi berhasil', async () => {
    req.body = {
      first_name: 'New',
      last_name: 'User',
      email: 'new@test.com',
      password: 'password123',
    }

    User.findOne.mockResolvedValue(null)
    bcrypt.hash.mockResolvedValue('hashed_secret_password')
    User.create.mockResolvedValue({
      id: 101,
      email: 'new@test.com',
      first_name: 'New',
    })

    await registerUser(req, res)

    expect(bcrypt.hash).toHaveBeenCalled()
    expect(User.create).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'User registered successfully',
        userId: 101,
      })
    )
  })

  test('[Path 4] Return 500 jika terjadi error database', async () => {
    req.body = {
      first_name: 'Test',
      last_name: 'Error',
      email: 'err@test.com',
      password: 'password123',
    }

    User.findOne.mockRejectedValue(new Error('DB Connection Failed'))

    await registerUser(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Server error' })
  })
})
