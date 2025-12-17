import express from 'express'
import * as scheduleController from '../controllers/scheduleController.js' // Use named import

const router = express.Router()

// GET /api/schedules/:id/seats
router.get('/:movieId', scheduleController.showMovieDetailSchedule)
router.get('/seats/:scheduleId', scheduleController.showTakenSeats)

export default router
