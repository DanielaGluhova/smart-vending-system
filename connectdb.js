import { Sequelize } from "sequelize";

const sequelize = new Sequelize("postgres://postgres:example@db2:5432/smart-vending-system-database");
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

  // sequelize.sync({ force: true }).then(() => {
  //   console.log(`Database & tables created!`);
// });

export default sequelize;
