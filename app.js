import express from "express";
import categoryRoutes from "./routes/category.routes.js";
import ingredientRoutes from "./routes/ingredient.routes.js";

const app = express();

app.use(express.json());
app.use("/api/categories", categoryRoutes);
app.use("/api/ingredients", ingredientRoutes)

export default app;
