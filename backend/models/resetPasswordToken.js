

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ResetPasswordToken = sequelize.define(
  "ResetPasswordToken",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
        primaryKey: true,
        field: "reset_password_token_id",
    },
    userId: {
      type: DataTypes.BIGINT,
        allowNull: false,
        field: "user_id",
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    used: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }
);

export default ResetPasswordToken;