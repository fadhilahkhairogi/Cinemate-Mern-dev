// controllers/scheduleController.js
import ScheduleSeat from '../models/scheduleSeat.js'
import Schedule from '../models/schedule.js'
import Cinema from '../models/cinema.js'

export async function showMovieDetailSchedule(req, res) {
  const { movieId } = req.params
  try {
    const schedules = await Schedule.findAll({
      where: { movieId: BigInt(movieId) },
    })

    if (!schedules || schedules.length === 0) {
      return res.status(404).render('404', { errorMessage: 'schedule not found' })
    }

    // Add cinemaName for each schedule
    const scheduleWithCinema = await Promise.all(
      schedules.map(async sched => {
        const schedPlain = sched.get({ plain: true })
        const cinema = await Cinema.findByPk(schedPlain.cinemaId)
        schedPlain.cinemaName = cinema ? cinema.name : null
        return schedPlain
      })
    )

    // Group by cinemaId
    const grouped = scheduleWithCinema.reduce((acc, curr) => {
      const key = curr.cinemaId
      if (!acc[key]) {
        acc[key] = {
          cinemaId: curr.cinemaId,
          cinemaName: curr.cinemaName,
          schedules: [],
        }
      }
      acc[key].schedules.push({
        scheduleId: curr.scheduleId,
        movieId: curr.movieId,
        startTime: curr.startTime,
        studio: curr.studio,
      })

      return acc
    }, {})
    res.json({ schedule: Object.values(grouped) })
  } catch (err) {
    console.error(err)
    res.status(500).render('404', { errorMessage: err.message })
  }
}

export async function showOrderSchedule(req, res) {
  const { scheduleId } = req.params

  try {
    if (!scheduleId || isNaN(scheduleId)) {
      return res.status(400).json({ message: 'Invalid scheduleId' })
    }

    const schedule = await Schedule.findByPk(BigInt(scheduleId), {
      include: [
        {
          model: Cinema,
          as: 'cinema',
          attributes: ['name'],
        },
      ],
    })

    console.log('scheduleId:', scheduleId)
    console.log('cinemaId:', schedule.cinemaId)

    res.json({ schedule: schedule })
  } catch (err) {
    console.error(err)
    res.status(500).render('404', { errorMessage: err.message })
  }
}

export async function showTakenSeats(req, res) {
  const { scheduleId } = req.params
  try {
    if (!scheduleId || isNaN(scheduleId)) {
      return res.status(400).json({ message: 'Invalid scheduleId' })
    }
    const scheduleExists = await ScheduleSeat.count({
      where: { scheduleId: BigInt(scheduleId) },
    })

    if (scheduleExists === 0) {
      return res.status(404).json({
        message: 'Schedule not found',
      })
    }

    const seats = await ScheduleSeat.findAll({
      where: { scheduleId: BigInt(scheduleId), isAvailable: 0 },
      attributes: ['seatNumber'],
    })

    // console.log('scheduleId:', scheduleId)

    const takenSeats = seats.map(s => s.seatNumber)
    console.log('len:', takenSeats.length)

    res.json({ takenSeats: takenSeats })
  } catch (err) {
    console.error(err)
    res.status(500).render('404', { errorMessage: err.message })
  }
}

// export async function getSeats(req, res) {
//   try {
//     const { id } = req.params

//     // Query all seats for this schedule from DB
//     const seats = await Seat.findAll({
//       where: { scheduleId: id },
//       attributes: ['seatNumber', 'isAvailable'],
//     })

//     // Convert to { A1: true, A2: false, ... }
//     const seatMap = {}
//     seats.forEach(seat => {
//       seatMap[seat.seatNumber] = seat.isAvailable
//     })

//     res.json(seatMap)
//   } catch (err) {
//     console.error('Error fetching seats:', err)
//     res.status(500).json({ error: 'Internal server error' })
//   }
// }

// export default { showMovieDetailSchedule }
