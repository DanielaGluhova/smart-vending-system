import { DataTypes } from "sequelize";
import sequelize from "../connectdb.js";

export const BeverageAddon = sequelize.define("beverage_addons",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    beverageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "beverages", key: "id"}
    },
    addonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: "addons", key: "id"}
    }
},
{
    tableName: "beverage_addons",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["beverageId", "addonId"],
      },
        ],
});
