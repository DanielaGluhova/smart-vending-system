import { CategoryService } from "../services/category.service.js";

// Error codes
// 200 - OK -> The request was successful and the server returned the requested data.
// 201 - Created -> The request was successful and a new resource was created as a result.
// 400 - Bad Request -> The server could not understand the request due to invalid syntax.
// 401 - Unauthorized -> The client must authenticate itself to get the requested response.
// 403 - Forbidden -> The client does not have access rights to the content.
// 404 - Not Found -> The server can not find the requested resource.
// 500 - Internal Server Error -> The server has encountered a situation it doesn't know how to handle.
export const CategoryController = {
    getStatusCode(errorMessage) {
        switch (errorMessage) {
            case "Category not found":
                return 404;
            case "Invalid id":
                return 400;
            case "Category name is required":
                return 400;
            case "Category already exists":
                return 400;
            default:
                return 500;
        }
    },

    async createCategory(req, res) {
        try {
            const { name } = req.body;
            const category = await CategoryService.createCategory(name);
            return res.status(201).json(category);
        } catch (error) {
            const status = CategoryController.getStatusCode(error.message)
            return res.status(status).json({ error: error.message });
        }
    },

    async getAllCategories(req, res) {
        try {
            const categories = await CategoryService.getAllCategories();
            return res.status(200).json(categories);
        } catch (error) {
            const status = CategoryController.getStatusCode(error.message)
            return res.status(status).json({ error: error.message });
        }
    },
    
    async getCategoryById(req, res) {
        try {
            const { id } = req.params;
            const category = await CategoryService.getCategoryById(id);
            return res.status(200).json(category);  
        } catch (error) {
            const status = CategoryController.getStatusCode(error.message)
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
            const status = CategoryController.getStatusCode(error.message)
            return res.status(status).json({ error: error.message });
        }
    },

    async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            const result = await CategoryService.deleteCategory(id);
            return res.status(200).json(result);    
        } catch (error) {
            const status = CategoryController.getStatusCode(error.message)
            return res.status(status).json({ error: error.message });
        }
    },
}