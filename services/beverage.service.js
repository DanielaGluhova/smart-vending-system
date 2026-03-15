import { BeverageRepository } from "../repositories/beverage.repository.js";
import { CategoryRepository } from "../repositories/category.repository.js";

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
    }
}