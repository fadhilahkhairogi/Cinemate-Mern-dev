// models/Schedule.js
import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'
import Movie from './movie.js'

// Schedule.js
const Schedule = sequelize.define(
  'Schedule',
  {
    scheduleId: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    movieId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    cinemaId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    // cinemaName: {
    //   type: DataTypes.VIRTUAL,
    //   get() {
    //     const start = this.getDataValue('cinemaId')

    //     return findByPk(cinemaId)
    //   },
    // },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    endTime: {
      type: DataTypes.VIRTUAL,
      get() {
        const start = this.getDataValue('startTime')

        const movie = this.getDataValue('movie')
        if (!start || !movie || !movie.durationInt) return null

        return new Date(start.getTime() + movie.durationInt * 60 * 1000)
      },
    },

    studio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'schedule',
    timestamps: false,
  }
)

export default Schedule
