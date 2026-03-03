import { AddonIngredient } from "../models/AddonIngredient.js";

export const AddonIngredientRepository = {
    async countByIngredientId(ingredientId) {
        return AddonIngredient.count({ where: { ingredientId } });
    }
} 