import { BeverageAddonService } from "../services/beverageAddon.service.js";
import { getStatusCode } from "../utils/httpErrorMapper.js";

export const BeverageAddonController = {
    async addAddonToBeverage(req,res) {
        try {
            const { beverageId } = req.params;
            const { addonId } = req.body;
            const addonToBeverage = await BeverageAddonService.addAddonToBeverage(beverageId, addonId);
            return res.status(201).json(addonToBeverage);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({ error: error.message });
        }
    },
    async getAddonsByBeverageId(req,res) {
        try {
            const { beverageId } = req.params;
            const addonByBeverageId = await BeverageAddonService.getAddonsByBeverageId(beverageId);
            return res.status(200).json(addonByBeverageId);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({ error: error.message });
        }
    },
    async removeAddonFromBeverage(req,res) {
        try {
            const { beverageId, addonId } = req.params;
            const deleted = await BeverageAddonService.removeAddonFromBeverage(beverageId, addonId);
            return res.status(200).json(deleted);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({ error: error.message });
        }
    }
}
