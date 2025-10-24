// models/Schedule.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
// import Movie from "./movie.js";

// Schedule.js
const Schedule = sequelize.define("Schedule", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  movieId: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
}, {
  tableName: "schedule",
  timestamps: false,
});



export default Schedule;
