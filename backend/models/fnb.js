//models/fnb.js

import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const FnB = sequelize.define(
  'FnB',
  {
    fnbId: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        field: 'fnb_id',
    },
    cinemaId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'cinema_id',
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: { min: 0 },
    },
    type: {
        type: DataTypes.ENUM('combo', 'snack', 'drink'),
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0 },
        defaultValue: 0,
    },
    photoFnb: {
        type: DataTypes.BLOB('medium'),
        allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'fnb',
    tableName: 'fnb',
    timestamps: false,
  }
)

export default FnB