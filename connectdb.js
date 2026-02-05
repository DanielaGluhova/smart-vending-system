import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "postgres://postgres:example@db2:5432/smart-vending-system-database",
  {
    logging: false,
  }
);

export async function connectDb() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ Database connection failed");
    throw error;
  }
}

export default sequelize;
