import express from 'express'
import dotenv from 'dotenv'
import sequelize from './config/database.js'
import { Movie, Schedule, ScheduleSeat } from './models/index.js'
import movieRoutes from './routes/movieRoutes.js'
import cinemaRoutes from './routes/cinemaRoutes.js'
import scheduleRoutes from './routes/scheduleRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import userRoutes from './routes/userRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import loadMovieData from './config/movieDataLoader.js'
import loadCinemaData from './config/cinemaDataLoader.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

async function initApp() {
  try {
    await sequelize.sync({ alter: true })
    // await loadCinemaData()
    // await loadMovieData()
  } catch (err) {
    console.error(err)
  }
}

initApp()

app.get('/', (req, res) => {
  // res.render('pay')
})

app.use('/api/movies', movieRoutes)
app.use('/api/cinemas', cinemaRoutes)
app.use('/api/schedules', scheduleRoutes)
app.use('/payment', paymentRoutes)
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Movie Ticket Application running on port ${PORT}`)
})
