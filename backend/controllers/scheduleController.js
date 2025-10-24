// controllers/scheduleController.js
import Seat from "../models/scheduleSeat.js";

export async function getSeats(req, res) {
  try {
    const { id } = req.params;

    // Query all seats for this schedule from DB
    const seats = await Seat.findAll({
      where: { scheduleId: id },
      attributes: ["seatNumber", "isAvailable"],
    });

    // Convert to { A1: true, A2: false, ... }
    const seatMap = {};
    seats.forEach(seat => {
      seatMap[seat.seatNumber] = seat.isAvailable;
    });

    res.json(seatMap);
  } catch (err) {
    console.error("Error fetching seats:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
