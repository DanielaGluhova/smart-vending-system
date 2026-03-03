import { CategoryService } from "../services/category.service.js";
import {getStatusCode} from "../utils/httpErrorMapper.js"

export const CategoryController = {

    async createCategory(req, res) {
        try {
            const { name } = req.body;
            const category = await CategoryService.createCategory(name);
            return res.status(201).json(category);
        } catch (error) {
            const status = getStatusCode(error.message)
            return res.status(status).json({ error: error.message });
        }
    },

    async getAllCategories(req, res) {
        try {
            const categories = await CategoryService.getAllCategories();
            return res.status(200).json(categories);
        } catch (error) {
            const status = getStatusCode(error.message)
            return res.status(status).json({ error: error.message });
        }
    },
    
    async getCategoryById(req, res) {
        try {
            const { id } = req.params;
            const category = await CategoryService.getCategoryById(id);
            return res.status(200).json(category);  
        } catch (error) {
            const status = getStatusCode(error.message)
            return res.status(status).json({ error: error.message });
        }
    },

    async updateCategory(req, res) {
        try { 
            const { id } = req.params;
            const { name } = req.body;
            const updated = await CategoryService.updateCategory(id, name);
            return res.status(200).json(updated);
        } catch (error) {
            const status = getStatusCode(error.message)
            return res.status(status).json({ error: error.message });
        }
    },

    async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            const result = await CategoryService.deleteCategory(id);
            return res.status(200).json(result);    
        } catch (error) {
            const status = getStatusCode(error.message)
            return res.status(status).json({ error: error.message });
        }
    },
}