import express from 'express'
import * as orderController from '../controllers/orderController.js'
import { checkAuth } from '../middleware/checkAuth.js'

const router = express.Router()

router.post('/movie/:movieId/schedule/:scheduleId/', checkAuth, orderController.placeOrder)

// router.get('/detail-film/:movieId', movieController.showMovieDetail)

export default router
