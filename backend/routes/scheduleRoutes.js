// routes/scheduleRoutes.js
const express = require("express");
const scheduleController = require("../controllers/scheduleController.js");

const router = express.Router();

// GET /api/schedules/:id/seats
router.get("/:id/seats", scheduleController.getSeats);

module.exports = router;
