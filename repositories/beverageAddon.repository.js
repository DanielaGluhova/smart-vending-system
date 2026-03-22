import { BeverageAddon } from "../models/BeverageAddon.js"

export const BeverageAddonRepository = {
    async create(data) {
        return BeverageAddon.create(data);
    },
    async findByBeverageAndAddon(beverageId,addonId) {
        return BeverageAddon.findOne({ where: { beverageId, addonId } });
    },
    async findAllByBeverageId(beverageId) {
        return BeverageAddon.findAll({ where: { beverageId } });
    },
    async remove(beverageAddonInstance) {
        return beverageAddonInstance.destroy();
    }
}