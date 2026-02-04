import app from "./app.js";
import { Addon } from "./connectdb.js";
import { Category } from "./connectdb.js";

const PORT = 3000;

(async () => {
  try {
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
