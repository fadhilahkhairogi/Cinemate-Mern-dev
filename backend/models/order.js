import { DataTypes, Transaction } from 'sequelize'
import sequelize from '../config/database.js'

const Order = sequelize.define(
  'Order',
  {
    orderId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: 'order_id',
    },
    userId: {
      type: DataTypes.BIGINT,
      field: 'user_id',
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'total_price',
    },
    seats: {
      type: DataTypes.JSON, // list of strings
      allowNull: false,
      defaultValue: [],
    },
    seatCount: {
      type: DataTypes.INTEGER,
      field: 'seat_count',
    },
    transactionStatus: {
      type: DataTypes.STRING,
      field: 'transaction_status',
    },
  },
  {
    tableName: 'order',
    timestamps: false,
  }
)

export default Order
