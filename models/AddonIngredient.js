import { DataTypes } from "sequelize";
import sequelize from "../connectdb.js";

export const AddonIngredient = sequelize.define("addon_ingredients", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    addonId: {
        type: DataTypes.INTEGER,
        references: { model: "addons", key: "id" },
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
},
{
    tableName: "addon_ingredients",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["addonId"],
        },
        {
            unique: false,
            fields: ["ingredientId"],
        }
    ],
    });