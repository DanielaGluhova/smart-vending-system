import { OrderService } from "../services/order.service.js";
import { getStatusCode } from "../utils/httpErrorMapper.js";

export const OrderController = {
    async placeOrder(req,res) {
        try {
            const { beverageId, addonIds } = req.body;
            const order = await OrderService.placeOrder(beverageId, addonIds);
            return res.status(200).json(order);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({ error: error.message });
        }
    },
    async previewOrder(req,res) {
        try {
            const { beverageId, addonIds } = req.body;
            const previewOrder = await OrderService.createOrderPreview(beverageId, addonIds);
            return res.status(200).json(previewOrder);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({ error: error.message });
        }
    }
}
