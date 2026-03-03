import { Ingredient } from "../models/Ingredient.js";
import { Op } from "sequelize";


export const IngredientRepository = {
    async create(data) {
        return Ingredient.create(data);
    },
    async findAll() {
        return Ingredient.findAll({ order: [["id", "ASC"]] });
    },
    async findInStock() {
        return Ingredient.findAll({ where: { stock: { [Op.gt]: 0 } }, order: [["id", "ASC"]] });
    },
    async findById(id) {
        return Ingredient.findByPk(id);
    },
    async findByName(name) {
        return Ingredient.findOne({ where: { name } });
    },
    async update(ingredientInstance, data) {
        return ingredientInstance.update(data);
    },
    async remove(ingredientInstance) {
        return ingredientInstance.destroy();
    }
}