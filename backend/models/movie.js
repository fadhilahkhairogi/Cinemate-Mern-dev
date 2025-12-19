import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');
// import Schedule from "./schedule.js";
const Movie = sequelize.define(
  'Movie',
  {
    movieId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: 'movie_id',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genres: {
      type: DataTypes.JSON, // list of strings
      allowNull: false,
      defaultValue: [],
    },
    releaseDate: {
      type: DataTypes.DATEONLY, // yyyy-MM-dd
      field: 'release_date',
    },
    duration: {
      type: DataTypes.STRING,
    },
    durationInt: {
      type: DataTypes.VIRTUAL,
      get() {
        const duration = this.getDataValue('duration')
        return parseInt(duration.replace(/\D+/g, ''))
      },
    },
    posterUrl: {
      type: DataTypes.STRING,
      field: 'poster_url',
    },
    photoBg: {
      type: DataTypes.STRING,
      field: 'photo_bg',
    },
    photo1: {
      type: DataTypes.STRING,
      field: 'photo1',
    },
    photo2: {
      type: DataTypes.STRING,
      field: 'photo2',
    },
    photo3: {
      type: DataTypes.STRING,
      field: 'photo3',
    },
    trailerUrl: {
      type: DataTypes.STRING,
      field: 'trailer_url',
    },
    description: {
      type: DataTypes.TEXT,
    },
    age: {
      type: DataTypes.STRING,
    },
    genresString: {
      type: DataTypes.VIRTUAL,
      get() {
        const genres = this.getDataValue('genres')
        return genres ? genres.join('/') : ''
      },
    },

    rating: {
      type: DataTypes.DECIMAL(3, 1),
      defaultValue: 0,
      allowNull: false,
    },
    ratingCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    ratingCountString: {
      type: DataTypes.VIRTUAL,
      get() {
        let ratingCount = this.getDataValue('ratingCount')

        if (ratingCount === 0) {
          return ''
        } else if (ratingCount >= 1000000) {
          if (ratingCount >= 10000000) {
            ratingCount /= 1000000
            return `${ratingCount}m+ ratings`
          } else {
            ratingCount /= 100000
            ratingCount = Math.floor(ratingCount)
            const decim = ratingCount % 10 === 0 ? '' : '.' + (ratingCount % 10)
            ratingCount /= 10
            ratingCount = Math.floor(ratingCount)
            return `${ratingCount}${decim}m+ ratings`
          }
        } else if (ratingCount >= 1000) {
          if (ratingCount >= 10000) {
            ratingCount /= 1000
            return `${ratingCount}k+ ratings`
          } else {
            ratingCount /= 100
            ratingCount = Math.floor(ratingCount)
            const decim = ratingCount % 10 === 0 ? '' : '.' + (ratingCount % 10)
            ratingCount /= 10
            ratingCount = Math.floor(ratingCount)
            return `${ratingCount}${decim}k+ ratings`
          }
        } else {
          return `${ratingCount} ratings`
        }
      },
    },
  },
  {
    tableName: 'movie',
    timestamps: false, // disable createdAt/updatedAt
  }
)

// Helper function like your `ListToString`
Movie.listToString = list => list.join('/')

export default Movie
