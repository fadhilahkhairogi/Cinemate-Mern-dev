// // config/movieDataLoader.js
// import fs from 'fs'
// import Movie from '../models/movie.js'
// import Schedule from '../models/schedule.js'
// import ScheduleSeat from '../models/scheduleSeat.js' // import seats

// export default async function loadScheduleData(movieId) {
//   try {
//     const filePath = './data/scheduleData.json'

//     if (!fs.existsSync(filePath)) {
//       console.error('ERROR: scheduleData.json not found!')
//       return
//     }

//     const jsonData = fs.readFileSync(filePath, 'utf-8')
//     const schedules = JSON.parse(jsonData)

//     for (const schedule of schedules) {
//       // Create the movie first
//       const createdMovie = await Movie.create({
//         movieId: findbytitle(schedule.movieName),
//         genres: movie.genres,
//         releaseDate: movie.releaseDate,
//         duration: movie.duration,
//         posterUrl: movie.posterUrl,
//         photoBg: movie.photoBg,
//         photo1: movie.photo1,
//         photo2: movie.photo2,
//         photo3: movie.photo3,
//         trailerUrl: movie.trailer,
//         description: movie.description,
//         age: movie.age,
//         rating: movie.rating,
//         ratingCount: movie.ratingCount,
//       })

//       // Create schedules
//       // if (movie.scheduleTime && Array.isArray(movie.scheduleTime)) {
//       //   for (const time of movie.scheduleTime) {
//       //     const schedule = await Schedule.create({
//       //       startTime: new Date(time),
//       //       movieId: createdMovie.movieId,
//       //       cinemaId: await find by name createdMovie.cinema
//       //     })

//       //     // Create seats for each schedule
//       //     const seats = []
//       //     for (let row = 65; row <= 71; row++) {
//       //       // A-G
//       //       for (let col = 1; col <= 10; col++) {
//       //         seats.push({
//       //           seatNumber: String.fromCharCode(row) + col,
//       //           scheduleId: schedule.id,
//       //         })
//       //       }
//       //     }
//       //     await ScheduleSeat.bulkCreate(seats)
//       //   }
//       // }
//     }

//     console.log('✅ Schedule data loaded successfully!')
//   } catch (err) {
//     console.error('❌ Error loading schedule data:', err)
//   }
// }
