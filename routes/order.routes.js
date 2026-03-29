import { Router } from "express";
import { OrderController } from "../contollers/order.controller.js";

const router = Router();

router.post("/preview", OrderController.previewOrder);
router.post("/", OrderController.placeOrder);

export default router;