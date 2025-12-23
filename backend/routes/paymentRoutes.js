import express from 'express'
import * as paymentController from '../controllers/paymentController.js'
import { checkAuth } from '../middleware/checkAuth.js'

const router = express.Router()

router.post('/create', checkAuth, paymentController.initiateTransaction)
router.post('/midtrans-webhook', paymentController.handleWebhook)
router.post('/detail/:orderId', paymentController.showPaymentDetail)

export default router
