import { BeverageIngredientRepository } from "../repositories/beverageIngredient.repository.js";
import { BeverageRepository } from "../repositories/beverage.repository.js";
import { IngredientRepository } from "../repositories/ingredient.repository.js";

export const BeverageIngredientService = {
    async addIngredientToRecipe(beverageId, ingredientId, amount) {
        const numericBeverageId = Number(beverageId);
        if (!Number.isInteger(numericBeverageId)) {
            throw new Error("Invalid beverage id");
        }
        const beverage = await BeverageRepository.findById(numericBeverageId);
        if (!beverage) {
            throw new Error("Beverage not found");
        }

        const numericIngredientId = Number(ingredientId);
        if (!Number.isInteger(numericIngredientId)) {
            throw new Error("Invalid ingredient id");
        }

        const ingredient = await IngredientRepository.findById(numericIngredientId);
        if (!ingredient) {
            throw new Error("Ingredient not found");
        }

        const numericAmount = Number(amount);
        if (Number.isNaN(numericAmount) || numericAmount <= 0) {
            throw new Error("Amount must be a number and greater than 0");
        }

        const existingRecipeIngredient = await BeverageIngredientRepository.findByBeverageAndIngredient(numericBeverageId,numericIngredientId);
        if (existingRecipeIngredient) {
            throw new Error("Ingredient already exists in recipe");
        }

        return BeverageIngredientRepository.create({ beverageId: numericBeverageId, ingredientId: numericIngredientId, amount: numericAmount});
    },
    async getRecipeByBeverageId(beverageId) {
        const numericBeverageId = Number(beverageId);
        if (!Number.isInteger(numericBeverageId)) {
            throw new Error("Invalid beverage id");
        }

        const beverage = await BeverageRepository.findById(numericBeverageId);
        if (!beverage) {
            throw new Error("Beverage not found");
        }

        return BeverageIngredientRepository.findAllByBeverageId( numericBeverageId);
    },
    async updateRecipeIngredient(beverageId, ingredientId, amount) {
        const numericBeverageId = Number(beverageId);
        if (!Number.isInteger(numericBeverageId)) {
            throw new Error("Invalid beverage id");
        }

        const beverage = await BeverageRepository.findById(numericBeverageId);
        if (!beverage) {
            throw new Error("Beverage not found");
        }

        const numericIngredientId = Number(ingredientId);
        if (!Number.isInteger(numericIngredientId)) {
            throw new Error("Invalid ingredient id");
        }

        const ingredient = await IngredientRepository.findById(numericIngredientId);
        if (!ingredient) {
            throw new Error("Ingredient not found");
        }

        const numericAmount = Number(amount);
        if (Number.isNaN(numericAmount) || numericAmount <= 0) {
            throw new Error("Amount must be a number and greater than 0");
        }

        const existingRecipeIngredient = await BeverageIngredientRepository.findByBeverageAndIngredient(numericBeverageId, numericIngredientId);
        if (!existingRecipeIngredient) {
            throw new Error("Recipe ingredient not found");
        }

        return BeverageIngredientRepository.update(existingRecipeIngredient, { amount: numericAmount} );
    },
    async deleteRecipeIngredient(beverageId,ingredientId) {
        const numericBeverageId = Number(beverageId);
        if (!Number.isInteger(numericBeverageId)) {
            throw new Error("Invalid beverage id");
        }

        const beverage = await BeverageRepository.findById(numericBeverageId);
        if (!beverage) {
            throw new Error("Beverage not found");
        }

        const numericIngredientId = Number(ingredientId);
        if (!Number.isInteger(numericIngredientId)) {
            throw new Error("Invalid ingredient id");
        }

        const existingRecipeIngredient = await BeverageIngredientRepository.findByBeverageAndIngredient(numericBeverageId,numericIngredientId);
        if (!existingRecipeIngredient) {
            throw new Error("Ingredient not found in recipe");
        }

        await BeverageIngredientRepository.remove(existingRecipeIngredient);
        
        return {message: "Recipe ingredient deleted"}
    }
}