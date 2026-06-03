import app from "./app.js";
import { connectDb } from "./connectdb.js";
import "./models/index.js";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDb();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start");
    process.exit(1);
  }
}

startServer();
