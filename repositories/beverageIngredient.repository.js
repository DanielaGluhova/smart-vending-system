import { BeverageIngredient } from "../models/BeverageIngredient.js"

export const BeverageIngredientRepository = {
    async countByIngredientId(ingredientId) {
        return BeverageIngredient.count({ where: { ingredientId } });
    }
}