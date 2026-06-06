import { IngredientService } from "../services/ingredient.service.js";
import { getStatusCode } from "../utils/httpErrorMapper.js";

export const IngredientController = {
    async createIngredient(req,res) {
        try {
            const { name, unit, stock } = req.body;
            const ingredient = await IngredientService.createIngredient(name, unit, stock);
            return res.status(201).json(ingredient);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({error: error.message});
        }
    },
    async getAllIngredients(req, res) {
        try {
            let ingredients;
            if (req.query.available === "true") {
                ingredients = await IngredientService.getAvailableIngredients();
            } else {
                ingredients = await IngredientService.getAllIngredients();
            }
            return res.status(200).json(ingredients); 
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({ error: error.message });
        }
    },
    async getIngredientById(req, res) {
        try {
            const { id } = req.params;
            const ingredient = await IngredientService.getIngredientById(id);
            return res.status(200).json(ingredient);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({error: error.message});
        }
    },
    async updateIngredient(req,res) {
        try {
            const { id } = req.params;
            const { name, unit, stock } = req.body;
            const updatedIngredient = await IngredientService.updateIngredient(id, name, unit, stock);
            return res.status(200).json(updatedIngredient);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({ error: error.message });
        }
    },
    async deleteIngredient(req, res) {
        try {
            const { id } = req.params;
            const deleted = await IngredientService.deleteIngredient(id);
            return res.status(200).json(deleted);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({error: error.message});
        }
    }
    
}