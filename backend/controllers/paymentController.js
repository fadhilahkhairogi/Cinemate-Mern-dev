// Importing the Payment model
import Payment from '../models/payment.js' // Note: If using ES Modules, use .js extension

// Creating a transaction
export async function createTransaction(req, res) {
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
    // Call the Payment model to create a transaction
    const transaction = await Payment.createTransaction(orderId, amount, customer)
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
