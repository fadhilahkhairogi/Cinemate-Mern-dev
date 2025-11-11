import express from 'express'
import { createTransaction, handleWebhook } from '../controllers/paymentController.js'

const router = express.Router()

router.post('/create-transaction', createTransaction)
router.post('/midtrans-webhook', handleWebhook)

export default router
