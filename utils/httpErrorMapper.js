const ERROR_STATUS_MAP = {
   "Invalid id": 400,
    "Category name is required": 400,
    "Category already exists": 400,
    "Category not found": 404,
    "Ingredient not found": 404,
    "Ingredient name is required!": 400,
    "Ingredient already exists!": 400,
    "Unit must be ml,gr or pcs": 400,
    "Stock must be number and grater than or equal to 0": 400,
    "Cannot delete ingredient because it is used in recipes": 409,
}

export const getStatusCode = (message) => {
return ERROR_STATUS_MAP[message] || 500
}
