import { AddonIngredient } from "../models/AddonIngredient.js";

export const AddonIngredientRepository = {
    async create(data) {
        return AddonIngredient.create(data);
    },
    async findByAddonId(addonId) {
        return AddonIngredient.findOne({where: {addonId}});
    },
    async update(addonIngredientInstance, data) {
        return addonIngredientInstance.update(data);
    },
    async remove(addonIngredientInstance) {
        return addonIngredientInstance.destroy();
    }
} 