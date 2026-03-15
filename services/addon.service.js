import { AddonRepository } from "../repositories/addon.repository.js";

export const AddonService = {
    async createAddon(name, price) {
        const normalizedName = name?.trim().toLowerCase();
        if (!normalizedName) {
            throw new Error("Addon name is required!");
        }
        
        const exists = await AddonRepository.findByName(normalizedName);
        if (exists) {
            throw new Error("Addon already exists!");
        }

        const numericPrice = Number(price);
        if (Number.isNaN(numericPrice) || numericPrice < 0) {
            throw new Error("Price must be number and greater than or equal to 0");
        }

        return AddonRepository.create({ name: normalizedName, price: numericPrice });
    },

    async getAllAddons() {
        return AddonRepository.findAll();
    },
    async getAvailableAddons() {
        
    },
    async getAddonById(id) {
        const numericId = Number(id);
        if (!Number.isInteger(numericId)) {
            throw new Error("Invalid id");
        }

        const addon = await AddonRepository.findById(numericId);
        if (!addon) {
            throw new Error("Addon not found!");
        }
        return addon;
    },
    async updateAddon(id, name, price) {
        const numericId = Number(id);
        if (!Number.isInteger(numericId)) {
            throw new Error("Invalid id");
        }

        const addon = await AddonRepository.findById(numericId);
        if (!addon) {
            throw new Error("Addon not found!");
        }

        const normalizedName = name?.trim().toLowerCase();
        if (!normalizedName) {
            throw new Error("Addon name is required!");
        }

        const numericPrice = Number(price);
        if (Number.isNaN(numericPrice) || numericPrice < 0) {
            throw new Error("Price must be number and greater than or equal to 0");
        }

        const exists = await AddonRepository.findByName(normalizedName);
        if (exists && exists.id !== addon.id) {
            throw new Error("Addon already exists!");
        }

        return AddonRepository.update(addon,{name: normalizedName, price: numericPrice});
    },

    async deleteAddon(id) {
        const numericId = Number(id);
        if (!Number.isInteger(numericId)) {
            throw new Error("Invalid id");
        }

        const addon = await AddonRepository.findById(numericId);
        if (!addon) {
            throw new Error("Addon not found!");
        }

        await AddonRepository.remove(addon);

        return {message: "Addon deleted!"}
    }
}