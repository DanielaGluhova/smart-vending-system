import { DataTypes } from "sequelize";
import sequelize from "../connectdb.js";

export const Addon = sequelize.define(
  "Addon",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DOUBLE, allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  {
    tableName: "addons",
    timestamps: false,
  }
);
