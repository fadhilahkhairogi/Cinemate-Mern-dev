import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Cinema = sequelize.define(
  'Cinema',
  {
    cinemaId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: 'cinema_id',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      //   defaultValue: 'XXI name',
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      //   defaultValue: 'Bandung',
    },
    location: {
      type: DataTypes.TEXT,
      field: 'release_date',
      allowNull: false,
    },
    numOfStudio: {
      type: DataTypes.INTEGER,
      field: 'num_of_studio',
      allowNull: false,
    },
    priceWeekday: { type: DataTypes.INTEGER, allowNull: false },
    priceFriday: { type: DataTypes.INTEGER, allowNull: false },
    priceWeekend: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: 'cinema',
    timestamps: false,
  }
)

// Helper function like your `ListToString`
// Cinema.listToString = list => list.join('/')

export default Cinema
