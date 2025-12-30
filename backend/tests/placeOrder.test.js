import { placeOrder } from '../controllers/orderController.js'
import Schedule from '../models/schedule.js'
import ScheduleSeat from '../models/scheduleSeat.js'
import Order from '../models/order.js'
import sequelize from '../config/database.js'

jest.mock('../models/schedule.js')
jest.mock('../models/scheduleSeat.js')
jest.mock('../models/order.js')

sequelize.transaction = jest.fn().mockResolvedValue({
  commit: jest.fn(),
  rollback: jest.fn(),
  LOCK: { UPDATE: 'UPDATE' },
})
describe('White Box Testing - placeOrder (Complexity: 5)', () => {
  let req, res, mockTransaction

  beforeEach(() => {
    jest.clearAllMocks()
    req = { body: {}, params: { scheduleId: 1 }, user: { userId: 99 } }
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
    mockTransaction = { commit: jest.fn(), rollback: jest.fn(), LOCK: { UPDATE: 'UPDATE' } }
    sequelize.transaction.mockResolvedValue(mockTransaction)
  })

  test('[Path 1] Return 400 jika input kursi kosong/invalid', async () => {
    req.body = { checkedSeats: [] }
    await placeOrder(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
  })

  test('[Path 2] Return 404 jika jadwal tidak ditemukan', async () => {
    req.body = { checkedSeats: ['A1'] }
    Schedule.findByPk.mockResolvedValue(null)
    await placeOrder(req, res)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(mockTransaction.rollback).toHaveBeenCalled()
  })

  test('[Path 3] Return 409 jika kursi rebutan/sudah diambil', async () => {
    req.body = { checkedSeats: ['A1'] }
    Schedule.findByPk.mockResolvedValue({ price: 50000 })
    ScheduleSeat.findAll.mockResolvedValue([])

    await placeOrder(req, res)
    expect(res.status).toHaveBeenCalledWith(409)

    expect(mockTransaction.rollback).toHaveBeenCalled()
  })

  test('[Path 4] Return 201 jika order berhasil', async () => {
    req.body = { checkedSeats: ['A1'] }

    Schedule.findByPk.mockResolvedValue({ price: 50000 })
    ScheduleSeat.findAll.mockResolvedValue([{ seatNumber: 'A1' }])
    Order.create.mockResolvedValue({ id: 123, totalPrice: 50000 })

    await placeOrder(req, res)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(mockTransaction.commit).toHaveBeenCalled()
  })

  test('[Path 5] Return 500 jika Database Crash', async () => {
    req.body = { checkedSeats: ['A1'] }
    sequelize.transaction.mockRejectedValue(new Error('DB Down'))

    await placeOrder(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
  })
})
