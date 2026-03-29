import { BeverageRepository } from "../repositories/beverage.repository.js";
import { BeverageIngredientRepository } from "../repositories/beverageIngredient.repository.js";
import { IngredientRepository } from "../repositories/ingredient.repository.js";
import { CategoryRepository } from "../repositories/category.repository.js";
import { BeverageAddonRepository } from "../repositories/beverageAddon.repository.js";
import { AddonRepository } from "../repositories/addon.repository.js";
import { AddonIngredientRepository } from "../repositories/addonIngredient.repository.js";

export const BeverageService = {
    async createBeverage(name, description, basePrice, categoryId) {
        const normalizedName = name?.trim().toLowerCase();
        if (!normalizedName) {
            throw new Error("Beverage name is required!");
        }

        const exists = await BeverageRepository.findByName(normalizedName);
        if (exists) {
            throw new Error("Beverage already exists!");
        }

        const numericBasePrice = Number(basePrice);
        if (Number.isNaN(numericBasePrice) || numericBasePrice < 0) {
            throw new Error("Base price must be a number greater than or equal to 0");
        }

        const numericCategoryId = Number(categoryId);
        if (!Number.isInteger(numericCategoryId)) {
            throw new Error("Invalid category id");
        }

        const category = await CategoryRepository.findById(numericCategoryId);
        if (!category) {
            throw new Error("Category not found");
        }

        return BeverageRepository.create({name: normalizedName, description, basePrice: numericBasePrice, categoryId: numericCategoryId});   
    },
    async getAllBeverages() {
        return BeverageRepository.findAll();
    },
    async getBeverageById(id) {
        const numericId = Number(id);
        if (!Number.isInteger(numericId)) {
            throw new Error("Invalid id");
        }

        const beverage = await BeverageRepository.findById(numericId);
        if (!beverage) {
            throw new Error("Beverage not found");
        }

        return beverage;
    },
    async updateBeverage(id, name, description, basePrice, categoryId) {
        const numericId = Number(id);
        if (!Number.isInteger(numericId)) {
            throw new Error("Invalid id");
        }

        const beverage = await BeverageRepository.findById(numericId);
        if (!beverage) {
            throw new Error("Beverage not found");
        }

        const normalizedName = name?.trim().toLowerCase();
        if (!normalizedName) {
            throw new Error("Beverage name is required!");
        }

        const numericBasePrice = Number(basePrice);
        if (Number.isNaN(numericBasePrice) || numericBasePrice < 0) {
            throw new Error("Base price must be a number greater than or equal to 0");            
        }

        const numericCategoryId = Number(categoryId);
        if (!Number.isInteger(numericCategoryId)) {
            throw new Error("Invalid category id");
        }

        const category = await CategoryRepository.findById(numericCategoryId);
        if (!category) {
            throw new Error("Category not found");
        }

        const exists = await BeverageRepository.findByName(normalizedName);
        if (exists && exists.id !== beverage.id) {
            throw new Error("Beverage already exists!");
        }

        return BeverageRepository.update(beverage, {name: normalizedName, description, basePrice: numericBasePrice, categoryId: numericCategoryId});
    },
    async deleteBeverage(id) {
        const numericId = Number(id);
        if (!Number.isInteger(numericId)) {
            throw new Error("Invalid id");
        }

        const beverage = await BeverageRepository.findById(numericId);
        if (!beverage) {
            throw new Error("Beverage not found");
        }

        await BeverageRepository.remove(beverage);

        return {message: "Beverage deleted!"}
    },
    async canPrepareBeverage(id) {
        const numericId = Number(id);
        if (!Number.isInteger(numericId)) {
            throw new Error("Invalid beverage id");
        }

        const beverage = await BeverageRepository.findById(numericId);
        if (!beverage) {
            throw new Error("Beverage not found");
        }

        if (!beverage.isActive) {
            return false;
        }

        const recipeIngredients = await BeverageIngredientRepository.findAllByBeverageId(numericId);

        if (!recipeIngredients || recipeIngredients.length === 0) {
            return false;
        }

        for (const recipeIngredient of recipeIngredients) {
            
            if (!recipeIngredient.Ingredient) {
                return false;
            }

            if (Number(recipeIngredient.Ingredient.stock) < Number(recipeIngredient.amount)) {
                return false;
            }
        }

        return true;
    },
    async getAvailableBeverages() {
        const beverages = await BeverageRepository.findAll();

        const availableBeverages = [];

        for (const beverage of beverages) {
            const canPrepare = await this.canPrepareBeverage(beverage.id);

            if (canPrepare) {
                availableBeverages.push(beverage);
            }
            
        }

        return availableBeverages;
    },
    async getAvailableAddonsForBeverage(id) {
        const numericBeverageId = Number(id);
        if (!Number.isInteger(numericBeverageId)) {
            throw new Error("Invalid beverage id");
        }

        const beverage = await BeverageRepository.findById(numericBeverageId);
        if (!beverage) {
            throw new Error("Beverage not found");
            
        }

        const beverageAddons = await BeverageAddonRepository.findAllByBeverageId(numericBeverageId);
        if (!beverageAddons || beverageAddons.length ===0) {
            return [];
        }

        const availableAddons = [];
        for (const beverageAddon of beverageAddons) {
            const addon = await AddonRepository.findById(beverageAddon.addonId);

            if (!addon) {
                continue;
            }

            if (!addon.isActive) {
                continue;
            }

            const addonIngredient = await AddonIngredientRepository.findByAddonId(beverageAddon.addonId);

            if (!addonIngredient) {
                continue;
            }

            const ingredient = await IngredientRepository.findById(addonIngredient.ingredientId);
            if (!ingredient) {
                continue;
            }

            if (Number(ingredient.stock) < Number(addonIngredient.amount)) {
                continue;
            }

            availableAddons.push(addon);

        }
        return availableAddons;
    }
}