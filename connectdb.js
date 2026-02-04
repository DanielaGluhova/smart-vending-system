import { Sequelize } from "sequelize";

const sequelize = new Sequelize("postgres://postgres:example@db2:5432/db");
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default sequelize;
