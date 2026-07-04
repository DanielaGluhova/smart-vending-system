import { BeverageRepository } from "../repositories/beverage.repository.js";
import { AddonRepository } from "../repositories/addon.repository.js";
import { BeverageAddonRepository } from "../repositories/beverageAddon.repository.js";
import { BeverageService } from "../services/beverage.service.js";
import { AddonIngredientRepository } from "../repositories/addonIngredient.repository.js";
import { IngredientRepository } from "../repositories/ingredient.repository.js";
import { BeverageIngredientRepository } from "../repositories/beverageIngredient.repository.js";

export const OrderService = {
    async validateAndGetAddons(numericBeverageId, addonIds) {
        const isArray = Array.isArray(addonIds);
        if (!isArray) {
            throw new Error("AddonIds must be array");
        }

        const beverage = await BeverageRepository.findById(numericBeverageId);
        if (!beverage) {
            throw new Error("Beverage not found");
        }

        const beverageAddons = beverage.Addons || [];
        const validAddons = [];

        for (const addonId of addonIds) {
            const numericAddonId = Number(addonId);
            if (!Number.isInteger(numericAddonId)) {
                throw new Error("Invalid addon id");
            }

            const findMatchedAddon = beverageAddons.find(addon => addon.id === numericAddonId);

            if (!findMatchedAddon) {
                throw new Error("Addon not found for this beverage");
            }

            validAddons.push(findMatchedAddon);
        }
        return validAddons;
    },

    async calculateOrderTotal(beverageId,addonIds) {
        const numericBeverageId = Number(beverageId);
        if (!Number.isInteger(numericBeverageId)) {
            throw new Error("Invalid beverage id");
        }

        const beverage = await BeverageRepository.findById(numericBeverageId);
        if (!beverage) {
            throw new Error("Beverage not found");
        }
        
        let total = Number(beverage.basePrice);

        const validAddons = await this.validateAndGetAddons(numericBeverageId, addonIds);
        return validAddons.reduce((total, addon) => total + Number(addon.price), total);
    },
    async validateOrder(beverageId, addonIds) {
        const numericBeverageId = Number(beverageId);
        if (!Number.isInteger(numericBeverageId)) {
            throw new Error("Invalid beverage id");
        }

        const beverage = await BeverageRepository.findById(numericBeverageId);
        if (!beverage) {
            throw new Error("Beverage not found");
        }

        const canPrepareBeverage = await BeverageService.canPrepareBeverage(numericBeverageId);
        if (!canPrepareBeverage) {
            return false;
        }

        const validAddons = await this.validateAndGetAddons(numericBeverageId, addonIds);

        for (const addon of validAddons) {
            if (!addon.isActive) {
                return false;
            }

            const addonIngredient = await AddonIngredientRepository.findByAddonId(addon.id);
            if (!addonIngredient) {
                return false;
            }

            const ingredient = await IngredientRepository.findById(addonIngredient.ingredientId);
            if (!ingredient) {
                return false;
            }

            if (Number(ingredient.stock) < Number(addonIngredient.amount)) {
                return false;
            }
            
        }
        return true;

    },
    async consumeIngredientsForOrder(beverageId,addonIds) {
        const numericBeverageId = Number(beverageId);
        if (!Number.isInteger(numericBeverageId)) {
            throw new Error("Invalid beverage id");
        }

        const beverage = await BeverageRepository.findById(numericBeverageId);
        if (!beverage) {
            throw new Error("Beverage not found");
        }

        const isArray = Array.isArray(addonIds);
        if (!isArray) {
            throw new Error("AddonIds must be array");
        }

        const isValidOrder = await this.validateOrder(numericBeverageId, addonIds);
        if (!isValidOrder) {
            throw new Error("Order is not valid");
        }

        const beverageRecipeItems = await BeverageIngredientRepository.findAllByBeverageId(numericBeverageId);
        
        for (const beverageRecipeItem of beverageRecipeItems){
            const ingredient = await IngredientRepository.findById(beverageRecipeItem.ingredientId);

            if (!ingredient) {
                throw new Error("Ingredient not found");
            }

            const newStock = Number(ingredient.stock) - Number(beverageRecipeItem.amount);
            await IngredientRepository.update(ingredient, { stock: newStock });

        }

        for (const addonId of addonIds) {
            const numericAddonId = Number(addonId);
            if (!Number.isInteger(numericAddonId)) {
                throw new Error("Invalid addon id");
            }
            const addonIngredient = await AddonIngredientRepository.findByAddonId(numericAddonId);
            if (!addonIngredient) {
                throw new Error("Addon ingredient not found");
            }
            const ingredient = await IngredientRepository.findById(addonIngredient.ingredientId);
            if (!ingredient) {
                throw new Error("Ingredient not found");
            }
            const newStock = Number(ingredient.stock) - Number(addonIngredient.amount);
            await IngredientRepository.update(ingredient, { stock: newStock });
        }
        return {message: "Ingredients consumed successfully" };
    },
    async placeOrder(beverageId, addonIds) {
        const isValidOrder = await this.validateOrder(beverageId, addonIds);
        if (!isValidOrder) {
            throw new Error("Order is not valid");
        }

        const total = await this.calculateOrderTotal(beverageId, addonIds);

        await this.consumeIngredientsForOrder(beverageId, addonIds);

        return { message: "Order placed successfully",total};
    },
    async createOrderPreview(beverageId,addonIds) {
        const numericBeverageId = Number(beverageId);
        if (!Number.isInteger(numericBeverageId)) {
            throw new Error("Invalid beverage id");
        }

        const beverage = await BeverageRepository.findById(numericBeverageId);
        if (!beverage) {
            throw new Error("Beverage not found");
        }

        const isArray = Array.isArray(addonIds);
        if (!isArray) {
            throw new Error("AddonIds must be array");
        }

        let selectedAddons = [];

        for (const addonId of addonIds){
            const numericAddonId = Number(addonId);
            if (!Number.isInteger(numericAddonId)) {
                throw new Error("Invalid addon id");
            }

            const addon = await AddonRepository.findById(numericAddonId);
            if (!addon) {
                throw new Error("Addon not found");
            }

            selectedAddons.push(addon);
        }

        const total = await this.calculateOrderTotal(beverageId, addonIds);
        const isValid = await this.validateOrder(beverageId, addonIds);

        return { beverage: beverage, addons: selectedAddons, total: total, valid: isValid };
    }

}