import express from 'express'
import * as orderController from '../controllers/orderController.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.redirect('/')
})

router.post('/movie/:movieId/schedule/:scheduleId/', orderController.placeOrder)

// router.get('/detail-film/:movieId', movieController.showMovieDetail)

export default router
