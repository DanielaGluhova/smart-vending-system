import { DataTypes } from "sequelize";
import sequelize from "../connectdb.js";

export const Ingredient = sequelize.define("Ingrеdient", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    unit: {
        type: DataTypes.ENUM("gr", "ml", "pcs"),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    tableName: "ingredients",
    timestamps: false,        
}
);
