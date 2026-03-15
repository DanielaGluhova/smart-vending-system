import { Addon } from "../models/Addon.js";
import { Op } from "sequelize";

export const AddonRepository = {
    async create(data) {
        return Addon.create(data);
    },
    async findAll() {
        return Addon.findAll({ order:[["id", "ASC"]] });
    },
    async findActive() {
        return Addon.findAll({ where: { isActive: true }, order: [["id", "ASC"]] });
    },
    async findById(id) {
        return Addon.findByPk(id);
    },
    async findByName(name) {
        return Addon.findOne({where: {name}});
    },
    async update(addonInstance, data) {
        return addonInstance.update(data);
    },
    async remove(addonInstance) {
        return addonInstance.destroy();
    }
}