// Importing the Payment model
import Payment from '../models/payment.js'
import Order from '../models/order.js'
import { Schedule, Movie, Cinema } from '../models/index.js'
import midtransClient from 'midtrans-client' // Use ES Module imports
import config from '../config/paymentGetaway.js' // Make sure you add .js extension in the path

let snap = new midtransClient.Snap({
  isProduction: config.midtrans.isProduction,
  serversKey: config.midtrans.serverKey,
  clientKey: config.midtrans.clientKey,
})

// Creating a transaction
export async function createTransaction(orderId, amount, customer) {
  const parameter = {
    transaction_details: { order_id: orderId, gross_amount: amount },
    customer_details: customer,
  }
  return await snap.createTransaction(parameter)
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
  const orderId = 'ORDER-' + Date.now()
  let day = new Date().getDay()
  let amount

  // Determine the amount based on the day of the week
  if (day >= 1 && day <= 4) {
    amount = 25000
  } else if (day === 5) {
    amount = 30000
  } else {
    amount = 40000
  }

  const customer = {
    first_name: 'Cust',
    last_name: '01',
    email: 'Cust01@example.com',
    phone: '+628127856789',
  }

  try {
    const transaction = await createTransaction(orderId, amount, customer)
    res.json({ token: transaction.token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Handle the incoming webhook request
export async function handleWebhook(req, res) {
  const body = req.body
  console.log('Webhook received:', body)
  // Update transaction status in the database according to body.transaction_status
  res.sendStatus(200)
}
