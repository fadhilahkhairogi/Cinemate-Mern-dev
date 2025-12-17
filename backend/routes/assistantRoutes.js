// routes/assistantRoutes.js
import express from 'express'
import * as assistantController from '../controllers/assistantController.js'

const router = express.Router()

router.get('/', (req, res) => {})

// Show all movies page
router.post('/helper', assistantController.getResponse)

// Search movies by title
// router.get('/search', movieController.searchMovies)

// Filter movies by genre
// router.get('/genre', movieController.showMoviesGenre)

// Show movie detail by ID (must be last to prevent conflicts)
// router.get('/:movieId', movieController.getMovieDetail)

export default router
