//user.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; 

const User = sequelize.define( "User", {
    userId: {
        type: DataTypes.BIGINT, 
        autoIncrement: true, 
        primaryKey: true, 
        field: "user_id"
    }, 
    first_name: {
        type: DataTypes.STRING, 
        allowNull: false, 
    },
    last_name: {
        type: DataTypes.STRING, 
        allowNull: false, 
    },
    username: {
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true,
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
        type: DataTypes.ENUM("user", "admin"),
        allowNull: false,
        defaultValue: "user",
    },
    photo_profile: {
        type: DataTypes.BLOB("medium"),
        allowNull: true,
    }
}, 
    {
    sequelize,
    modelName: "user",
    tableName: "user",
    timestamps: false,
  }
);

export default User;
