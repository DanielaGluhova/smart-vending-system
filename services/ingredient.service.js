import { IngredientRepository } from "../repositories/ingredient.repository.js";
import { ALLOWED_UNITS } from "../constants/units.js";
import { BeverageIngredientRepository } from "../repositories/beverageIngredient.repository.js";
import { AddonIngredientRepository } from "../repositories/addonIngredient.repository.js";

export const IngredientService = {
    async createIngredient(name, unit, stock) {

        const normalizedName = name?.trim().toLowerCase();
        if (!normalizedName) {
            throw new Error("Ingredient name is required!");
        }
        
        const exists = await IngredientRepository.findByName(normalizedName);
        if (exists) {
            throw new Error("Ingredient already exists!");
        }

        const normalizedUnit = unit?.trim().toLowerCase();

        if (!normalizedUnit || !ALLOWED_UNITS.includes(normalizedUnit)) {
            throw new Error("Unit must be ml,gr or pcs");
        }

        if (!Number.isInteger(stock) || stock < 0) {
            throw new Error("Stock must be number and grater than or equal to 0");            
        }

        return IngredientRepository.create({ name: normalizedName, unit: normalizedUnit, stock });

    },

    async getAllIngredients() {
        return IngredientRepository.findAll();
    },

    async getAvailableIngredients() {
        return IngredientRepository.findInStock();
    },

    async getIngredientById(id) {
        const numericId = Number(id);
        if (!Number.isInteger(numericId)) {
            throw new Error("Invalid id");
        }

        const ingredient = await IngredientRepository.findById(numericId);
        if (!ingredient) {
            throw new Error("Ingredient not found");
            
        }

        return ingredient;
    },
    
    async updateIngredient(id, name, unit, stock) {
        const numericId = Number(id);
        if (!Number.isInteger(numericId)) {
            throw new Error("Invalid id");   
        }

        const ingredient = await IngredientRepository.findById(numericId);
        if (!ingredient) {
            throw new Error("Ingredient not found");
            
        }

        const normalizedName = name?.trim().toLowerCase();
        if (!normalizedName) {
            throw new Error("Ingredient name is required!");
        }

        const normalizedUnit = unit?.trim().toLowerCase();

        if (!normalizedUnit || !ALLOWED_UNITS.includes(normalizedUnit)) {
            throw new Error("Unit must be ml,gr or pcs");
        }

        if (!Number.isInteger(stock) || stock < 0) {
            throw new Error("Stock must be number and grater than or equal to 0");            
        }

        const exists = await IngredientRepository.findByName(normalizedName);
        if (exists && exists.id !== ingredient.id) {
            throw new Error("Ingredient already exists!");
        }

        return IngredientRepository.update(ingredient, { name: normalizedName, unit: normalizedUnit, stock });
    },

    async deleteIngredient(id) {
        const numericId = Number(id);
        if (!Number.isInteger(numericId)) {
            throw new Error("Invalid id");
        }

        const ingredient = await IngredientRepository.findById(numericId);
        if (!ingredient) {
            throw new Error("Ingredient not found");
        }

        const beverageCount = await BeverageIngredientRepository.countByIngredientId(numericId);
        const addonCount = await AddonIngredientRepository.countByIngredientId(numericId);
        if (beverageCount > 0 || addonCount > 0) {
            throw new Error("Cannot delete ingredient because it is used in recipes");
        }

        await IngredientRepository.remove(ingredient);

        return { message: "Ingredient deleted" };
    }

}