import { Beverage } from "../models/Beverage.js";
import { Addon } from "../models/Addon.js";
import { Category } from "../models/Category.js";

export const BeverageRepository = {
    async create(data) {
        return Beverage.create(data);
    },
    async findAll() {
        return Beverage.findAll({include: Category, order: [["id", "ASC"]],});
    },
    async findById(id) {
        return Beverage.findByPk(id, { include: [Category, Addon] });
    },
    async findByName(name) {
        return Beverage.findOne({ where: { name } });
    },
    async update(beverageInstance, data) {
        return beverageInstance.update(data);
    },
    async remove(beverageInstance) {
        return beverageInstance.destroy();
    }
}