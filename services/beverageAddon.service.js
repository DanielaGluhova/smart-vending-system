import { BeverageRepository } from "../repositories/beverage.repository.js";
import { BeverageAddonRepository } from "../repositories/beverageAddon.repository.js";
import { AddonRepository } from "../repositories/addon.repository.js";

export const BeverageAddonService = {
    async addAddonToBeverage(beverageId, addonId) {
        const numericBeverageId = Number(beverageId);
        if (!Number.isInteger(numericBeverageId)) {
            throw new Error("Invalid beverage id");
        }

        const beverage = await BeverageRepository.findById(numericBeverageId);
        if (!beverage) {
            throw new Error("Beverage not found");
        }

        const numericAddonId = Number(addonId);
        if (!Number.isInteger(numericAddonId)) {
            throw new Error("Invalid addon id");
        }

        const addon = await AddonRepository.findById(numericAddonId);
        if (!addon) {
            throw new Error("Addon not found!");
        }

        const existingRecipeAddon = await BeverageAddonRepository.findByBeverageAndAddon(numericBeverageId, numericAddonId);
        if (existingRecipeAddon) {
            throw new Error("Addon already exists in beverage");
        }

        return BeverageAddonRepository.create({ beverageId: numericBeverageId, addonId: numericAddonId });

    },
    async getAddonsByBeverageId(beverageId) {
        const numericBeverageId = Number(beverageId);
        if (!Number.isInteger(numericBeverageId)) {
            throw new Error("Invalid beverage id");
        }

        const beverage = await BeverageRepository.findById(numericBeverageId);
        if (!beverage) {
            throw new Error("Beverage not found");
        }

        return BeverageAddonRepository.findAllByBeverageId(numericBeverageId);
    },
    async removeAddonFromBeverage(beverageId, addonId) {
        const numericBeverageId = Number(beverageId);
        if (!Number.isInteger(numericBeverageId)) {
            throw new Error("Invalid beverage id");
        }

        const beverage = await BeverageRepository.findById(numericBeverageId);
        if (!beverage) {
            throw new Error("Beverage not found");
        }

        const numericAddonId = Number(addonId);
        if (!Number.isInteger(numericAddonId)) {
            throw new Error("Invalid addon id");
        }

        const existingRecipeAddon = await BeverageAddonRepository.findByBeverageAndAddon(numericBeverageId, numericAddonId);
        if (!existingRecipeAddon) {
            throw new Error("Addon not found in beverage");
        }

        await BeverageAddonRepository.remove(existingRecipeAddon);

        return { message: "Addon removed from beverage" };
    }
}