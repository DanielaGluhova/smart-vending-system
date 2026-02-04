import { DataTypes } from "sequelize";
import sequelize from "../connectdb.js";

export const Category = sequelize.define("categories", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  tableName: "categories",
  timestamps: false,
}
);
