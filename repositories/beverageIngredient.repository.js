import { BeverageIngredient } from "../models/BeverageIngredient.js"

export const BeverageIngredientRepository = {
    async countByIngredientId(ingredientId) {
        return BeverageIngredient.count({ where: { ingredientId } });
    },
    async create(data) {
        return BeverageIngredient.create(data);
    },
    async findByBeverageAndIngredient(beverageId, ingredientId) {
        return BeverageIngredient.findOne({ where: { beverageId, ingredientId } });
    },
    async findAllByBeverageId(beverageId) {
        return BeverageIngredient.findAll({ where: { beverageId } });
    },
    async update(beverageIngredientInstance, data) {
        return beverageIngredientInstance.update(data);
    },
    async remove(beverageIngredientInstance) {
        return beverageIngredientInstance.destroy();
    }

}