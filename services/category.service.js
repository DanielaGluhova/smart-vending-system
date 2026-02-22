import { CategoryRepository } from "../repositories/category.repository.js";

export const CategoryService = {
  async createCategory(name) {
    if (!name || !name.trim()) {
      throw new Error("Category name is required");
    }

    const trimmedName = name.trim();

    const exists = await CategoryRepository.findByName(trimmedName);
    if (exists) {
      throw new Error("Category already exists");
    }

    return CategoryRepository.create({ name: trimmedName });
  },

  async getAllCategories() {
    return CategoryRepository.findAll();
  },

  async getCategoryById(id) {
    const parsedId = Number(id);
    if (!Number.isInteger(parsedId)) {
      throw new Error("Invalid id");
    }

    const category = await CategoryRepository.findById(parsedId);
    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  },

  async updateCategory(id, name) {
    const parsedId = Number(id);
    if (!Number.isInteger(parsedId)) {
      throw new Error("Invalid id");
    }

    const category = await CategoryRepository.findById(parsedId);
    if (!category) {
      throw new Error("Category not found");
    }

    if (!name || !name.trim()) {
      throw new Error("Category name is required");
    }

    const trimmedName = name.trim();

    const existing = await CategoryRepository.findByName(trimmedName);
    if (existing && existing.id !== category.id) {
      throw new Error("Category already exists");
    }

    return CategoryRepository.update(category, { name: trimmedName });
  },

  async deleteCategory(id) {
    const parsedId = Number(id);
    if (!Number.isInteger(parsedId)) {
      throw new Error("Invalid id");
    }

    const category = await CategoryRepository.findById(parsedId);
    if (!category) {
      throw new Error("Category not found");
    }

    await CategoryRepository.remove(category);

    return { message: "Category Deleted" };
  },
};