import express from 'express'
import scheduleController from '../controllers/scheduleController.js' // Use named import

const router = express.Router()

// GET /api/schedules/:id/seats
router.get('/:id/seats', scheduleController.getSeats)

export default router
