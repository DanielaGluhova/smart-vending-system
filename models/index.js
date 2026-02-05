import { Addon } from "./Addon.js";
import { Category } from "./Category.js";
import { Ingredient } from "./Ingredient.js";
import { Beverage } from "./Beverage.js"
import { BeverageIngredient } from "./BeverageIngredient.js";

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

export {
  Addon,
  Category,
  Ingredient,
  Beverage,
  BeverageIngredient
};
