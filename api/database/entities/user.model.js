import { DataTypes } from "sequelize";

import { sequelize } from "../db.js";

import { Task } from "./task.model.js";

export const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    paranoid: true,
  },
);

User.belongsToMany(Task, { through: "UserTasks" });
Task.belongsToMany(User, { through: "UserTasks" });
