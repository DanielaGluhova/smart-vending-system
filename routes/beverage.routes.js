import { BeverageController } from "../contollers/beverage.controller.js";
import { BeverageIngredientController } from "../contollers/beverageIngredient.controller.js";
import { BeverageAddonController } from "../contollers/beverageAddon.controller.js";
import { Router } from "express";

const router = Router();

router.post("/", BeverageController.createBeverage);
router.get("/", BeverageController.getAllBeverages);
router.get("/:id", BeverageController.getBeverageById);
router.put("/:id", BeverageController.updateBeverage);
router.delete("/:id", BeverageController.deleteBeverage);
router.post("/:beverageId/ingredients", BeverageIngredientController.addIngredientToRecipe);
router.get("/:beverageId/ingredients", BeverageIngredientController.getRecipeByBeverageId);
router.put("/:beverageId/ingredients/:ingredientId", BeverageIngredientController.updateRecipeIngredient);
router.delete("/:beverageId/ingredients/:ingredientId", BeverageIngredientController.deleteRecipeIngredient);
router.post("/:beverageId/addons", BeverageAddonController.addAddonToBeverage);
router.get("/:beverageId/addons", BeverageAddonController.getAddonsByBeverageId);
router.delete("/:beverageId/addons/:addonId", BeverageAddonController.removeAddonFromBeverage);


export default router;