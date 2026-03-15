import { AddonService } from "../services/addon.service.js";
import { getStatusCode } from "../utils/httpErrorMapper.js";

export const AddonController = {
    async createAddon(req, res) {
        try {
            const { name, price } = req.body;
            const addon = await AddonService.createAddon(name, price);
            return res.status(201).json(addon);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({ error: error.message });
        }
    },

    async getAllAddons(req, res) {
        try {
            const addons = await AddonService.getAllAddons();
            return res.status(200).json(addons);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({ error: error.message });
        }
    },

    async getAddonById(req, res) {
        try {
            const { id } = req.params;
            const addon = await AddonService.getAddonById(id);
            return res.status(200).json(addon);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({ error: error.message });
        }
    },

    async updateAddon(req, res) {
        try {
            const { id } = req.params;
            const { name, price } = req.body;
            const updated = await AddonService.updateAddon(id, name, price);
            return res.status(200).json(updated);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({ error: error.message });
        }
    },

    async deleteAddon(req, res) {
        try {
            const { id } = req.params;
            const deleted = await AddonService.deleteAddon(id);
            return res.status(200).json(deleted);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({ error: error.message });
        }
    },
}