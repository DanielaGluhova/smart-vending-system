import app from "./app.js";
import { Addon } from "./models/Addon.js";
import { Category } from "./models/Category.js"

const PORT = 3000;

(async () => {
  try {
    await sequelize.authenticate();
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ DB connection failed:", error.message);
    process.exit(1);
  }
})();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
