// config/movieDataLoader.js
import fs from 'fs'
import Movie from '../models/movie.js'
import Schedule from '../models/schedule.js'
import ScheduleSeat from '../models/scheduleSeat.js' // import seats

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
        name: movie.name,
        genres: movie.genres,
        releaseDate: movie.releaseDate,
        duration: movie.duration,
        posterUrl: movie.posterUrl,
        description: movie.description,
        age: movie.age,
      })

      // Create schedules
      if (movie.scheduleTime && Array.isArray(movie.scheduleTime)) {
        for (const time of movie.scheduleTime) {
          const schedule = await Schedule.create({
            time: new Date(time), // convert to Date
            movieId: createdMovie.movieId, // FK
          })

          // Create seats for each schedule
          const seats = []
          for (let row = 65; row <= 71; row++) {
            // A-G
            for (let col = 1; col <= 10; col++) {
              seats.push({
                seatNumber: String.fromCharCode(row) + col,
                scheduleId: schedule.id,
              })
            }
          }
          await ScheduleSeat.bulkCreate(seats)
        }
      }
    }

    console.log('✅ Movies data loaded successfully!')
  } catch (err) {
    console.error('❌ Error loading movies data:', err)
  }
}
