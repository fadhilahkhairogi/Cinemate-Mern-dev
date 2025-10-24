const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/create-transaction', paymentController.createTransaction);
router.post('/midtrans-webhook', paymentController.handleWebhook);

module.exports = router;
