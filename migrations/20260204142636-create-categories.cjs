'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("categories", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    await queryInterface.addConstraint("categories", {
      fields: ["name"],
      type: "unique",
      name: "uq_categories_name",
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable("categories");
  }
};
