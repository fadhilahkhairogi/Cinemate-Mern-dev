import Movie from './movie.js'
import Schedule from './schedule.js'
import ScheduleSeat from './scheduleSeat.js'

// Movie ↔ Schedule
Movie.hasMany(Schedule, { foreignKey: 'movieId', as: 'schedules', onDelete: 'CASCADE' })
Schedule.belongsTo(Movie, { foreignKey: 'movieId', as: 'movie' })

// Schedule ↔ ScheduleSeat
Schedule.hasMany(ScheduleSeat, { foreignKey: 'scheduleId', as: 'seats', onDelete: 'CASCADE' })
ScheduleSeat.belongsTo(Schedule, { foreignKey: 'scheduleId', as: 'schedule' })

export { Movie, Schedule, ScheduleSeat }
