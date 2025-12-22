import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Payment = sequelize.define(
  'Payment',
  {
    paymentId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: 'payment_id',
    },
    orderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'payment_method',
    },
    paymentDate: {
      type: DataTypes.DATE,
      field: 'payment_date',
      default: DataTypes.NOW,
    },
    paymentAmount: {
      type: DataTypes.BIGINT,
      field: 'payment_amount',
    },
  },
  {
    tableName: 'payment',
    timestamps: true,
  }
)

export default Payment
