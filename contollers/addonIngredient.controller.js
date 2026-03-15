import { AddonIngredientService } from "../services/addonIngredient.service.js";
import { getStatusCode } from "../utils/httpErrorMapper.js";

export const AddonIngredientController = {
    async setAddonIngredient(req, res) {
        try {
            const { id } = req.params;
            const { ingredientId, amount } = req.body;
            const addonIngredient = await AddonIngredientService.setAddonIngredient(id, ingredientId, amount);
            return res.status(200).json(addonIngredient);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({ error: error.message });
        }
    },
    async getAddonIngredientByAddonId(req, res) {
        try {
            const { id } = req.params;
            const addonIngredient = await AddonIngredientService.getAddonIngredientByAddonId(id);
            return res.status(200).json(addonIngredient);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({ error: error.message });
        }
    },
    async deleteAddonIngredient(req, res) {
        try {
            const { id } = req.params;
            const addonIngredient = await AddonIngredientService.deleteAddonIngredient(id);
            return res.status(200).json(addonIngredient);
        } catch (error) {
            const status = getStatusCode(error.message);
            return res.status(status).json({ error: error.message });
        }
    }

}