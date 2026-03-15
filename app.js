import express from "express";
import categoryRoutes from "./routes/category.routes.js";
import ingredientRoutes from "./routes/ingredient.routes.js";
import addonRoutes from "./routes/addon.routes.js"

const app = express();

app.use(express.json());
app.use("/api/categories", categoryRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/addons",addonRoutes);

export default app;
