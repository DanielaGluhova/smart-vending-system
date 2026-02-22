"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("addons", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("addons");
  },
};
