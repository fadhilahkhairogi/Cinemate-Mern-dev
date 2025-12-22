//userController.js

import User from '../models/user.js'
import Cinema from '../models/cinema.js'
import mailTransporter from '../config/mailTransporter.js'
import bcrypt from 'bcryptjs'

// Get User Profile (GET)
export async function getAllUsers(req, res) {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    })
    res.status(200).json({ users })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// get user by id
export async function getUserById(req, res) {
  const userId = req.params.id
    try {
    const user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] },
    })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json({ user })
    } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// edit user by id (Role and cinemaId only) (PUT)
export async function editUserById(req, res) {
  const userId = req.params.id
  const { role, cinemaId } = req.body
  let message = ''
  try {
    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    if (role === 'admin') {
      if (cinemaId !== undefined) {
        if (role !== 'admin') {
          return res.status(400).json({ 
            error: 'Only admin can be assigned a cinema' 
          })
        }

        if (cinemaId === null) {
          return res.status(400).json({ 
            error: 'cinemaId cannot be null for admin' 
          })
        }

        const cinema = await Cinema.findByPk(cinemaId)
        if (!cinema) {
          return res.status(404).json({ error: 'Cinema not found' })
        }
        user.role = role
        user.cinemaId = cinemaId
        message = 'Admin assigned successfully'
      }
    } else {
      user.role = role
      user.cinemaId = null
      message = 'role changed successfully'
    }

    await user.save()
    res.status(200).json({ message: 'Admin assigned successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// delete user by id (DELETE)
export async function deleteUserById(req, res) {
  const userId = req.params.id
  try {
    //prevent superAdmin deletion
    const userToDelete = await User.findByPk(userId)
    if (userToDelete.role === 'superadmin') {
      return res.status(403).json({ error: 'Cannot delete super admin' })
    }
    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    await user.destroy()
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// create admin user (POST)
export async function createAdminCinema(req, res) {
  const { first_name, last_name, email, password, role, cinemaId } = req.body
  try {
    if (!first_name || !last_name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' })
    }
    //email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email' })
    }

    const existingUser = await User.findOne({ where: { email } })
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' })
    }
    
    let finalCinemaId = null

    if (role === 'admin') {
      if (cinemaId === null) {
          return res.status(400).json({ 
            error: 'cinemaId cannot be null for admin' 
          })
        }
      
      const cinema = await Cinema.findByPk(cinemaId)
      if (!cinema) {
        return res.status(404).json({ 
          error: 'Cinema not found' 
        })
      }
      finalCinemaId = cinemaId
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role,
      cinemaId: finalCinemaId,
    })

    await mailTransporter.sendMail({
      to: email,
      subject: 'Admin account information',
      html: `
        <p>account information: </p>
        <h2>username: ${email}</h2>
        <h2>password: ${password}</h2>
        <h1>change immediately.</h1>
      `,
    })

    res.status(201).json({ message: 'Admin user created successfully', user: newUser })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}