import express from 'express'
import * as scheduleController from '../controllers/scheduleController.js' // Use named import

const router = express.Router()

// /api/schedules
router.get('/:movieId', scheduleController.showMovieDetailSchedule)
router.get('/seats/:scheduleId', scheduleController.showTakenSeats)
router.get('/detail/:scheduleId', scheduleController.showOrderSchedule)

export default router
