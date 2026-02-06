import { Addon } from "./Addon.js";
import { Category } from "./Category.js";
import { Ingredient } from "./Ingredient.js";
import { Beverage } from "./Beverage.js"
import { BeverageIngredient } from "./BeverageIngredient.js";
import { BeverageAddon } from "./BeverageAddon.js";

Category.hasMany(Beverage, { foreignKey: "categoryId" });
Beverage.belongsTo(Category, { foreignKey: "categoryId" });

Beverage.belongsToMany(Ingredient, {
  through: BeverageIngredient,
  foreignKey: "beverageId",
  otherKey: "ingredientId",
  timestamps: false,
});

Ingredient.belongsToMany(Beverage, {
  through: BeverageIngredient,
  foreignKey: "ingredientId",
  otherKey: "beverageId",
  timestamps: false,
});

Beverage.belongsToMany(Addon, {
  through: BeverageAddon,
  foreignKey: "beverageId",
  otherKey: "addonId",
  timestamps: false,
});

Addon.belongsToMany(Beverage, {
  through: BeverageAddon,
  foreignKey: "addonId",
  otherKey: "beverageId",
  timestamps: false,
});

export {
  Addon,
  Category,
  Ingredient,
  Beverage,
  BeverageIngredient,
  BeverageAddon
};
