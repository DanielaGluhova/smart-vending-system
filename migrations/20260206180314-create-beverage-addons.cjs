'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("beverage_addons", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      beverageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "beverages", key: "id" }
      },
      addonId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "addons", key: "id" }
      }
    });
    await queryInterface.addConstraint("beverage_addons", {
      fields: ["beverageId", "addonId"],
      type: "unique",
      name: "uq_beverage_addon_pair",
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('beverage_addons');
  }
};
