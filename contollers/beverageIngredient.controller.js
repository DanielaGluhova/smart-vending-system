import { BeverageIngredientService } from "../services/beverageIngredient.service.js";
import { getStatusCode } from "../utils/httpErrorMapper.js";

export const BeverageIngredientController = {
    async addIngredientToRecipe(req, res) {
        try {
            const { beverageId } = req.params;
            const { ingredientId, amount } = req.body;
            const ingredientToRecipe = await BeverageIngredientService.addIngredientToRecipe(beverageId, ingredientId, amount);
            return res.status(201).json(ingredientToRecipe);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({error: error.message});
        }
    },
    async getRecipeByBeverageId(req, res) {
        try {
            const { beverageId } = req.params;
            const recipeByBeverageId = await BeverageIngredientService.getRecipeByBeverageId(beverageId);
            return res.status(200).json(recipeByBeverageId);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({ error: error.message });
        }
    },
    async updateRecipeIngredient(req,res) {
        try {
            const { beverageId, ingredientId } = req.params;
            const { amount } = req.body;
            const updated = await BeverageIngredientService.updateRecipeIngredient(beverageId, ingredientId, amount);
            return res.status(200).json(updated);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({error: error.message});
        }
    },
    async deleteRecipeIngredient(req, res) {
        try {
            const { beverageId, ingredientId } = req.params;
            const deleted = await BeverageIngredientService.deleteRecipeIngredient(beverageId, ingredientId);
            return res.status(200).json(deleted);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({ error: error.message });
        }
    }

}