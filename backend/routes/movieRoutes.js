// routes/movieRoutes.js
// const express = require("express");
// const router = express.Router();
// const movieController = require("../controllers/movieController");

import express from 'express'
import * as movieController from '../controllers/movieController.js'

const router = express.Router()

// Default route: redirect /movies → /movies/view
router.get('/', (req, res) => {
  res.redirect('/movies/view')
})

// Show all movies page
router.get('/daftar-film', movieController.showMoviesPage)

// Search movies by title
router.get('/search', movieController.searchMovies)

// Filter movies by genre
router.get('/genre', movieController.showMoviesGenre)

// Show movie detail by ID (must be last to prevent conflicts)
// router.get('/:movieId', movieController.getMovieDetail)

router.get('/detail-film/:movieId', movieController.showMovieDetail)

// module.exports = router;
export default router
