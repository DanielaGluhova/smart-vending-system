import { DataTypes } from "sequelize";
import sequelize from "../connectdb"

export const Beverage = sequelize.define("beverages", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    basePrice: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, 
},
{
    tableName: "beverages",
    timestamps: false,
});