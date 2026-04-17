import { DataTypes } from "sequelize";

import { sequelize } from "../db.js";

export const Description = sequelize.define(
  "Description",
  {
    text: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    paranoid: true,
  },
);
