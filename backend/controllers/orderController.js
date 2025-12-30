//authController.js
import Order from '../models/order.js'
import ScheduleSeat from '../models/scheduleSeat.js'
import Schedule from '../models/schedule.js'
import sequelize from '../config/database.js'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// import Token from '../models/accessToken.js'
import { Op } from 'sequelize'

// Register User (POST)
// export async function placeOrder(req, res) {
//   const { checkedSeats, totalPrice, seatCount, transactionStatus } = req.body
//   const { movieId, scheduleId } = req.params
//   const errors = []

//   console.log(req.user.userId)

//   if (!checkedSeats || !totalPrice || !seatCount || !transactionStatus) {
//     errors.push({ msg: 'Please fill in all fields' })
//   }
//   if (!Array.isArray(checkedSeats) || checkedSeats.length === 0) {
//     errors.push({ msg: 'checked seats tidak valid' })
//   }
//   if (errors.length > 0) {
//     return res.status(400).json({ errors })
//   }

//   try {
//     // const existingUser = await User.findOne({
//     //   where: {
//     //     [Op.or]: [{ email }],
//     //   },
//     // })

//     // if (existingUser) {
//     //   const conflicts = []
//     //   if (existingUser.email === email) {
//     //     conflicts.push({ msg: 'Email is already registered' })
//     //   }
//     //   return res.status(409).json({ errors: conflicts })
//     // }
//     // const hashedPassword = await bcrypt.hash(password, 10)

//     const t = await sequelize.transaction()
//     let newOrder
//     try {
//       // const seats = await ScheduleSeat.findAll({
//       //   where: {
//       //     scheduleId: BigInt(scheduleId),
//       //     seatNumber: {
//       //       [Op.in]: checkedSeats,
//       //     },
//       //     isAvailable: true,
//       //   },
//       //   transaction: t,
//       //   lock: t.LOCK.UPDATE,
//       // })

//       // console.log('seats', seats)
//       // if (seats.length !== checkedSeats.length) {
//       //   throw new Error('Some seats are already booked')
//       // }

//       let sss = await ScheduleSeat.findAll(
//         // { isAvailable: false },
//         {
//           where: {
//             scheduleId,
//             seatNumber: {
//               [Op.in]: checkedSeats,
//             },
//           },
//           transaction: t,
//         }
//       )

//       console.log('seats', sss)

//       newOrder = await Order.create(
//         {
//           userId: req.user.userId,
//           scheduleId: scheduleId,
//           seats: checkedSeats,
//           totalPrice,
//           seatCount,
//           transactionStatus,
//         },
//         { transaction: t }
//       )

//       await ScheduleSeat.update(
//         { isAvailable: false },
//         {
//           where: {
//             scheduleId,
//             seatNumber: {
//               [Op.in]: checkedSeats,
//             },
//           },
//           transaction: t,
//         }
//       )

//       await t.commit()
//     } catch (err) {
//       await t.rollback()
//       throw err
//     }

//     res.status(201).json({
//       message: 'Order created successfully',
//       orderId: newOrder.orderId,
//     })
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ error: 'Server error' })
//   }
// }

export async function placeOrder(req, res) {
  const {
    checkedSeats,
    totalPrice: clientPrice,
    seatCount: clientSeatCount,
    transactionStatus: clientStatus,
  } = req.body
  const { scheduleId } = req.params
  const errors = []

  if (!checkedSeats) {
    errors.push({ msg: 'Please fill in all fields' })
  }
  if (!Array.isArray(checkedSeats) || checkedSeats.length === 0) {
    errors.push({ msg: 'checked seats tidak valid' })
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  let t

  try {
    t = await sequelize.transaction()

    const schedule = await Schedule.findByPk(scheduleId, { transaction: t })

    if (!schedule) {
      await t.rollback()
      return res.status(404).json({ error: 'Schedule not found' })
    }

    const seats = await ScheduleSeat.findAll({
      where: {
        scheduleId,
        seatNumber: {
          [Op.in]: checkedSeats,
        },
      },
      transaction: t,
      lock: t.LOCK.UPDATE,
    })

    if (seats.length !== checkedSeats.length) {
      await t.rollback()
      return res.status(409).json({ error: 'Some seats are already booked' })
    }

    const finalPrice = clientPrice || schedule.price * checkedSeats.length
    const finalSeatCount = clientSeatCount || checkedSeats.length
    const finalStatus = clientStatus || 'pending'

    const newOrder = await Order.create(
      {
        userId: req.user.userId,
        scheduleId: scheduleId,
        seats: checkedSeats,
        totalPrice: finalPrice,
        seatCount: finalSeatCount,
        transactionStatus: finalStatus,
      },
      { transaction: t }
    )

    await ScheduleSeat.update(
      { isAvailable: false },
      {
        where: {
          scheduleId,
          seatNumber: {
            [Op.in]: checkedSeats,
          },
        },
        transaction: t,
      }
    )

    await t.commit()

    res.status(201).json({
      message: 'Order created successfully',
      orderId: newOrder.orderId || newOrder.id,
    })
  } catch (err) {
    if (t && !t.finished) {
      await t.rollback()
    }
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}
// Login user (POST)
export async function loginUser(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Please fill in all fields' })
  }
  try {
    //check user exists
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' })
    }
    //check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    //generate JWT
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) //exp 1 day

    const token = jwt.sign(
      { userId: user.userId, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    //save to db
    await Token.create({
      userId: user.userId,
      token,
      expiresAt,
      revoked: false,
    })

    //respond in json
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.userId,
        email: user.email,
        role: user.role,
      },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// Logout user (POST)
export async function logoutUser(req, res) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' })
    }
    const token = authHeader.split(' ')[1]
    //revoke token in db
    const dbToken = await Token.findOne({ where: { token, revoked: false } })
    if (dbToken) {
      dbToken.revoked = true
      await dbToken.save()
    }
    res.json({ message: 'Logout successful' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}
