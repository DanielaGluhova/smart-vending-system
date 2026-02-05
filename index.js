import app from "./app.js";
import { connectDb } from "./connectdb.js";
import "./models/index.js";

const PORT = 3000;

async function startServer() {
  try {
    await connectDb();

    app.listen(PORT,"0.0.0.0", () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {С
    console.error("❌ Server failed to start");
    process.exit(1);
  }
}

startServer();
