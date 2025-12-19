// config/movieDataLoader.js
import fs from 'fs'
import Movie from '../models/movie.js'
import Schedule from '../models/schedule.js'
import ScheduleSeat from '../models/scheduleSeat.js' // import seats
// import scheduleDataLoader from './scheduleDataLoader.js'

export default async function loadMovieData() {
  try {
    const filePath = './data/moviesData.json'

    if (!fs.existsSync(filePath)) {
      console.error('ERROR: moviesData.json not found!')
      return
    }

    const jsonData = fs.readFileSync(filePath, 'utf-8')
    const movies = JSON.parse(jsonData)

    for (const movie of movies) {
      // Create the movie first
      const createdMovie = await Movie.create({
        name: movie.title,
        genres: movie.genres,
        releaseDate: movie.releaseDate,
        duration: movie.duration,
        posterUrl: movie.posterUrl,
        photoBg: movie.photoBg,
        photo1: movie.photo1,
        photo2: movie.photo2,
        photo3: movie.photo3,
        trailerUrl: movie.trailer,
        description: movie.description,
        age: movie.age,
        rating: movie.rating,
        ratingCount: movie.ratingCount,
      })

      // Create schedules

      for (const sched of movie.schedule) {
        const today = new Date()
        const yyyy = today.getFullYear()
        const mm = String(today.getMonth() + 1).padStart(2, '0')
        const dd = String(today.getDate()).padStart(2, '0')

        const dateTimeStr = `${yyyy}-${mm}-${dd} ${sched.startTime}` // MySQL DATETIME

        const schedule = await Schedule.create({
          startTime: dateTimeStr,
          movieId: createdMovie.movieId,
          cinemaId: sched.cinemaId,
          studio: sched.studio,
        })

        // Create seats for each schedule
        const seats = []
        for (let row = 65; row <= 71; row++) {
          // A-G
          for (let col = 1; col <= 10; col++) {
            seats.push({
              seatNumber: String.fromCharCode(row) + col,
              scheduleId: schedule.scheduleId,
            })
          }
        }
        await ScheduleSeat.bulkCreate(seats)
      }
    }

    console.log('✅ Movies data loaded successfully!')
  } catch (err) {
    console.error('❌ Error loading movies data:', err)
  }
  // scheduleDataLoader()
}
