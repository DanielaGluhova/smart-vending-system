import { DataTypes } from "sequelize";
import sequelize from "../connectdb.js";

export const Addon = sequelize.define(
  "Addon",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.STRING, allowNull: false },
    unit: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DOUBLE, allowNull: true },
  },
  {
    tableName: "addons",
    timestamps: false,
  }
);
