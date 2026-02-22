'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('addon_ingredients', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      addonId: {
        type: Sequelize.INTEGER,
        references: { model: "addons", key: "id" },
        allowNull: false
      },
      ingredientId: {
        type: Sequelize.INTEGER,
        references: { model: "ingredients", key: "id" },
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(10, 3),
        allowNull: false
      }
    });
    await queryInterface.addConstraint("addon_ingredients", {
      fields: ["addonId"],
      type: "unique",
      name: "uq_addon_ingredients_addonId",
    });
    await queryInterface.addIndex("addon_ingredients", ["ingredientId"], {
      name: "idx_addon_ingredients_ingredientId",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('addon_ingredients');
  }
};
