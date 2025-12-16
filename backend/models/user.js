//user.js
import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const User = sequelize.define(
  'User',
  {
    userId: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: 'user_id',
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin', 'superadmin'),
      allowNull: false,
      defaultValue: 'user',
    },
    photo_profile: {
      type: DataTypes.BLOB('medium'),
      allowNull: true,
    },
    cinemaId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'cinema_id',
    },
  },
  {
    sequelize,
    modelName: 'user',
    tableName: 'user',
    timestamps: false,
  }
)

export default User
