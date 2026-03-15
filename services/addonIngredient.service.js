import { AddonIngredientRepository } from "../repositories/addonIngredient.repository.js";
import { IngredientRepository } from "../repositories/ingredient.repository.js";
import { AddonRepository } from "../repositories/addon.repository.js";

export const AddonIngredientService = {
    async setAddonIngredient(addonId, ingredientId, amount) {
        const numericAddonId = Number(addonId);
        if (!Number.isInteger(numericAddonId)) {
            throw new Error("Invalid id");
        }

        const addon = await AddonRepository.findById(numericAddonId);

        if (!addon) {
            throw new Error("Addon not found!"); 
        }

        const numericIngredientId = Number(ingredientId);
        if (!Number.isInteger(numericIngredientId)) {
            throw new Error("Invalid id");
        }

        const ingredient = await IngredientRepository.findById(numericIngredientId);

        if (!ingredient) {
            throw new Error("Ingredient not found!");
        }

        const numericAmount = Number(amount);
        if (Number.isNaN(numericAmount) || numericAmount <= 0) {
            throw new Error("Amount must be a number and greater than 0");
        }

        const existingAddonIngredient = await AddonIngredientRepository.findByAddonId(numericAddonId);

        if (existingAddonIngredient) {
            return AddonIngredientRepository.update(existingAddonIngredient,{ ingredientId: numericIngredientId, amount: numericAmount});
        }

        return AddonIngredientRepository.create({ addonId: numericAddonId, ingredientId: numericIngredientId, amount: numericAmount});

    },
    
  async getAddonIngredientByAddonId(addonId) {
    const numericAddonId = Number(addonId);
    if (!Number.isInteger(numericAddonId)) {
      throw new Error("Invalid id");
    }

    const addon = await AddonRepository.findById(numericAddonId);
    if (!addon) {
      throw new Error("Addon not found!");
    }

    const existingAddonIngredient = await AddonIngredientRepository.findByAddonId(numericAddonId);

    if (!existingAddonIngredient) {
      throw new Error("Addon ingredient not found!");
    }

    return existingAddonIngredient;
  },

  async deleteAddonIngredient(addonId) {
    const numericAddonId = Number(addonId);
    if (!Number.isInteger(numericAddonId)) {
      throw new Error("Invalid id");
    }

    const addon = await AddonRepository.findById(numericAddonId);
    if (!addon) {
      throw new Error("Addon not found!");
    }

    const existingAddonIngredient = await AddonIngredientRepository.findByAddonId(numericAddonId);

    if (!existingAddonIngredient) {
      throw new Error("Addon ingredient not found!");
    }

    await AddonIngredientRepository.remove(existingAddonIngredient);

    return { message: "Addon ingredient deleted!" };
  },
}