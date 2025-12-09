import Movie from './movie.js'
import Schedule from './schedule.js'
import ScheduleSeat from './scheduleSeat.js'
import Cinema from './cinema.js'

// Movie ↔ Schedule
Movie.hasMany(Schedule, { foreignKey: 'movieId', as: 'schedules', onDelete: 'CASCADE' })
Schedule.belongsTo(Movie, { foreignKey: 'movieId', as: 'movie' })

// Cinema ↔ Schedule
Cinema.hasMany(Schedule, { foreignKey: 'cinemaId', as: 'schedules', onDelete: 'CASCADE' })
Schedule.belongsTo(Cinema, { foreignKey: 'cinemaId', as: 'cinema' })

// Movie ↔ Cinema
Movie.belongsToMany(Cinema, { through: 'MovieCinema', foreignKey: 'movieId' })
Cinema.belongsToMany(Movie, { through: 'MovieCinema', foreignKey: 'cinemaId', otherKey: 'movieId' })

// Schedule ↔ ScheduleSeat
Schedule.hasMany(ScheduleSeat, { foreignKey: 'scheduleId', as: 'seats', onDelete: 'CASCADE' })
// Schedule.hasMany(ScheduleSeat, { foreignKey: 'scheduleId', as: 'seats', onDelete: 'CASCADE' })
ScheduleSeat.belongsTo(Schedule, { foreignKey: 'scheduleId', as: 'schedule' })

export { Movie, Schedule, ScheduleSeat }
