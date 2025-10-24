const Payment = require('../models/payment');

async function createTransaction(req, res) {
    const orderId = 'ORDER-' + Date.now();
    let day = new Date().getDay();    
    let amount;
    if (day >= 1 && day <= 4) {
        amount = 25000;
    } else if (day === 5) {
        amount = 30000;
    } else {
        amount = 40000;
    }

    const customer = {
        first_name: 'Cust',
        last_name: '01',
        email: 'Cust01@example.com',
        phone: '+628127856789'
    };

    try {
        const transaction = await Payment.createTransaction(orderId, amount, customer);
        res.json({ token: transaction.token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function handleWebhook(req, res) {
    const body = req.body;
    console.log('Webhook received:', body);
    // update status transaksi di database sesuai body.transaction_status
    res.sendStatus(200);
}

module.exports = { createTransaction, handleWebhook };
