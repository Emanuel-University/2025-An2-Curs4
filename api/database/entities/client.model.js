import { DataTypes } from "sequelize";

import { sequelize } from "../db.js";

import { Task } from "./task.model.js";

export const Client = sequelize.define(
  "Client",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    priority: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
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

Client.hasMany(Task);
Task.belongsTo(Client);
