// Importing the Payment model
import Payment from '../models/payment.js'
import Order from '../models/order.js'
import { Schedule, Movie, Cinema } from '../models/index.js'
import midtransClient from 'midtrans-client' // Use ES Module imports
import config from '../config/paymentGetaway.js' // Make sure you add .js extension in the path
import { Model } from 'sequelize'

let snap = new midtransClient.Snap({
  isProduction: config.midtrans.isProduction,
  serverKey: config.midtrans.serverKey,
  clientKey: config.midtrans.clientKey,
})
export async function createTransaction(order, customer) {
  if (!(order instanceof Model)) {
    throw new Error('createTransaction expects Order model, got something else')
  }

  const orderData = order.get({ plain: true })
  console.log('ORDER DATA:', orderData)

  const ticketPrice = parseInt(orderData.totalPrice, 10)

  if (!Number.isInteger(ticketPrice) || ticketPrice <= 0) {
    throw new Error(`Invalid ticket price: ${orderData.totalPrice}`)
  }

  const serviceFee = 1602
  const tax = Math.round((ticketPrice + serviceFee) * 0.11)
  const grossAmount = ticketPrice + serviceFee + tax

  return await snap.createTransaction({
    transaction_details: {
      order_id: String(orderData.orderId),
      gross_amount: grossAmount,
    },
    customer_details: customer,
    item_details: [
      { id: `TICKET-${orderData.orderId}`, name: 'Movie Ticket', price: ticketPrice, quantity: 1 },
      { id: 'SERVICE-FEE', name: 'Service Fee', price: serviceFee, quantity: 1 },
      { id: 'TAX', name: 'PPN 11%', price: tax, quantity: 1 },
    ],
  })
}

export async function showPaymentDetail(req, res) {
  const { orderId } = req.params
  console.log('Order ID from request params:', orderId)
  try {
    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: Schedule,
          as: 'schedule',
          include: [
            {
              model: Movie,
              as: 'movie',
              attributes: ['name'],
            },
            {
              model: Cinema,
              as: 'cinema',
              attributes: ['name'],
            },
          ],
        },
      ],
    })

    if (!order) {
      return res.status(404).json({ errorMessage: 'Order not found' })
    }

    const orderJson = order.toJSON()
    console.log('Order JSON:', orderJson)

    res.json({ order: orderJson })
  } catch (err) {
    console.error(err)
    res.status(500).json({ errorMessage: err.message })
  }
}

export async function initiateTransaction(req, res) {
  const { orderId } = req.body

  try {
    const order = await Order.findByPk(orderId)
    console.log(order)
    if (!order) return res.status(404).json({ error: 'Order not found' })

    const userPay = req.user.get({ plain: true })

    const customer = {
      first_name: userPay.firstName || 'Customer',
      last_name: userPay.lastName || '',
      email: userPay.email,
      phone: userPay.phone || '08123456789',
    }

    const transaction = await createTransaction(order, customer)

    console.log('MIDTRANS TOKEN:', transaction.token)

    res.json({ token: transaction.token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}
// Handle the incoming webhook request
export async function handleWebhook(req, res) {
  const body = req.body
  console.log('Webhook received:', body)

  await Payment.create({
    orderId: body.order_id,
    paymentMethod: body.payment_type,
    paymentAmount: body.gross_amount,
    paymentDate: new Date(body.transaction_time),
  })

  // update status Order juga
  // await Order.update({ transactionStatus: body.transaction_status }, { where: { id: body.order_id } })

  res.sendStatus(200)
}
