import { Addon } from "./Addon.js";
import { Category } from "./Category.js";
import { Ingredient } from "./Ingredient.js";
import { Bevegare } from "./Beverage.js"

Category.hasMany(Beverage, { foreignKey: "categoryId" });
Beverage.belongsTo(Category, { foreignKey: "categoryId" });

export {
  Addon,
  Category,
  Ingredient,
  Bevegare
};
