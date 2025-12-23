import express from 'express'
import * as paymentController from '../controllers/paymentController.js'

const router = express.Router()

router.post('/create', paymentController.createTransaction)
router.post('/midtrans-webhook', paymentController.handleWebhook)
router.post('/detail/:orderId', paymentController.showPaymentDetail)

export default router
