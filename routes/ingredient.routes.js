import { Router } from "express";
import { IngredientController } from "../contollers/ingredient.controller.js";

const router = Router();

router.post("/", IngredientController.createIngredient);
router.get("/", IngredientController.getAllIngredients);
router.get("/:id", IngredientController.getIngredientById);
router.put("/:id", IngredientController.updateIngredient);
router.delete("/:id", IngredientController.deleteIngredient);

export default router;