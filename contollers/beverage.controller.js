import { BeverageService } from "../services/beverage.service.js";
import { getStatusCode } from "../utils/httpErrorMapper.js";

export const BeverageController = {
    async createBeverage(req, res) {
        try {
            const { name, description, basePrice, categoryId } = req.body;
            const beverage = await BeverageService.createBeverage(name, description, basePrice, categoryId);
            return res.status(201).json(beverage);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({ error: error.message });
        }
    },
    async getAllBeverages(req, res) {
        try {
            const beverages = await BeverageService.getAllBeverages();
            return res.status(200).json(beverages);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({ error: error.message });
        }
    },
    async getBeverageById(req, res) {
        try {
            const { id } = req.params;
            const beverage = await BeverageService.getBeverageById(id);
            return res.status(200).json(beverage);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({ error: error.message });
        }
    },
    async updateBeverage(req, res) {
        try {
            const { id } = req.params;
            const { name, description, basePrice, categoryId } = req.body;
            const updated = await BeverageService.updateBeverage(id, name, description, basePrice, categoryId);
            return res.status(200).json(updated);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({ error: error.message });
        }
    },
    async deleteBeverage(req, res) {
        try {
            const { id } = req.params;
            const deleted = await BeverageService.deleteBeverage(id);
            return res.status(200).json(deleted);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({ error: error.message });
        }
    }

}