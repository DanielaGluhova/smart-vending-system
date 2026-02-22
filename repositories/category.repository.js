import { Category } from "../models/Category.js";

export const CategoryRepository = {
    async create(data) {
        return Category.create(data);
    },
    async findAll() {
        return Category.findAll({ order:[["id", "ASC"]] });
    },
    async findById(id) {
        return Category.findByPk(id);
    },
    async findByName(name) {
        return Category.findOne({where: {name}});
    },
    async update(categoryInstance, data) {
        return categoryInstance.update(data);
    },
    async remove(categoryInstance) {
        return categoryInstance.destroy();
    },
};