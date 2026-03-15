import { Addon } from "./Addon.js";
import { Category } from "./Category.js";
import { Ingredient } from "./Ingredient.js";
import { Beverage } from "./Beverage.js";
import { BeverageIngredient } from "./BeverageIngredient.js";
import { BeverageAddon } from "./BeverageAddon.js";
import { AddonIngredient } from "./AddonIngredient.js";

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

Addon.hasOne(AddonIngredient, { foreignKey: "addonId" });
AddonIngredient.belongsTo(Addon, { foreignKey: "addonId" });

Ingredient.hasMany(AddonIngredient, { foreignKey: "ingredientId" });
AddonIngredient.belongsTo(Ingredient, { foreignKey: "ingredientId" });

Beverage.hasMany(BeverageIngredient, { foreignKey: "beverageId" });
BeverageIngredient.belongsTo(Beverage, { foreignKey: "beverageId" });

Ingredient.hasMany(BeverageIngredient, { foreignKey: "ingredientId" });
BeverageIngredient.belongsTo(Ingredient, { foreignKey: "ingredientId" });

Beverage.hasMany(BeverageAddon, { foreignKey: "beverageId" });
BeverageAddon.belongsTo(Beverage, { foreignKey: "beverageId" });

Addon.hasMany(BeverageAddon, { foreignKey: "addonId" });
BeverageAddon.belongsTo(Addon, { foreignKey: "addonId" });

export {
  Addon,
  Category,
  Ingredient,
  Beverage,
  BeverageIngredient,
  BeverageAddon,
  AddonIngredient,
};
