// routes/movieRoutes.js
// const express = require("express");
// const router = express.Router();
// const movieController = require("../controllers/movieController");

import express from 'express'
import * as cinemaController from '../controllers/cinemaController.js'

const router = express.Router()

router.get('/', (req, res) => {})

// Show all cinemas
// router.get('/:movieId', cinemaController.fetchCinemaSchedule)

// module.exports = router;
export default router
