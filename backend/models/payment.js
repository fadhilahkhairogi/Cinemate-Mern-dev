import midtransClient from 'midtrans-client' // Use ES Module imports
import config from '../config/paymentGetaway.js' // Make sure you add .js extension in the path

let snap = new midtransClient.Snap({
  isProduction: config.midtrans.isProduction,
  serverKey: config.midtrans.serverKey,
  clientKey: config.midtrans.clientKey,
})

async function createTransaction(orderId, amount, customer) {
  const parameter = {
    transaction_details: { order_id: orderId, gross_amount: amount },
    customer_details: customer,
  }
  return await snap.createTransaction(parameter)
}

// Default export (instead of named export)
export default { createTransaction }
