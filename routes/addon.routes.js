import { Router } from "express";
import { AddonController } from "../controllers/addon.controller.js";
import { AddonIngredientController } from "../controllers/addonIngredient.controller.js";

const router = Router();

router.post("/", AddonController.createAddon);
router.get("/", AddonController.getAllAddons);
router.get("/:id", AddonController.getAddonById);
router.put("/:id", AddonController.updateAddon);
router.delete("/:id", AddonController.deleteAddon);
router.put("/:id/ingredient", AddonIngredientController.setAddonIngredient);
router.get("/:id/ingredient", AddonIngredientController.getAddonIngredientByAddonId);
router.delete("/:id/ingredient", AddonIngredientController.deleteAddonIngredient);

export default router;