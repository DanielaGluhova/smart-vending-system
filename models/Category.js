import { DataTypes } from "sequelize";
import sequelize from "../connectdb.js";

export const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  tableName: "categories",
  timestamps: false,
}
);
