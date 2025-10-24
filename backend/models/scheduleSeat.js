// models/ScheduleSeat.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ScheduleSeat = sequelize.define("ScheduleSeat", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  seatNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  scheduleId: {
    type: DataTypes.BIGINT.UNSIGNED, // must match Schedule.id type
    allowNull: false,
  },
});




export default ScheduleSeat;
