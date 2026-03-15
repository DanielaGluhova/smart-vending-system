import { BeverageController } from "../contollers/beverage.controller.js";
import { Router } from "express";

const router = Router();

router.post("/", BeverageController.createBeverage);
router.get("/", BeverageController.getAllBeverages);
router.get("/:id", BeverageController.getBeverageById);
router.put("/:id", BeverageController.updateBeverage);
router.delete("/:id", BeverageController.deleteBeverage);

export default router;