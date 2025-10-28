const midtransClient = require('midtrans-client')
const config = require('../config/paymentGetaway')

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

module.exports = { createTransaction }
