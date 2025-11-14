// controllers/movieController.js
import { Op } from 'sequelize'
import Cinema from '../models/cinema.js'

// GET /cinema/
export async function fetchCinemaSchedule(req, res) {
  const { movieId } = req.params

  const movieWithCinemas = await Movie.findByPk(movieId, {
    include: [
      {
        model: Cinema,
        through: { attributes: [] },
        include: [
          {
            model: Schedule,
            where: { movieId },
            attributes: ['id', 'startTime'],
          },
        ],
      },
    ],
  })
}
