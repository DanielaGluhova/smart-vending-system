import { DataTypes } from "sequelize";
import sequelize from "../connectdb.js";

export const BeverageIngredient = sequelize.define("beverage_ingredients", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    beverageId: {
        type: DataTypes.INTEGER,
        references: { model: "beverages", key: "id" },
        allowNull: false
    },
    ingredientId: {
        type: DataTypes.INTEGER,
        references: { model: "ingredients", key: "id" },
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 3),
        allowNull: false
    },
    unit: {
        type: DataTypes.ENUM("gr", "ml", "pcs"),
        allowNull: false
    }
},
{
    tableName: "beverage_ingredients",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["beverageId", "ingredientId"],
      },
    ],
});