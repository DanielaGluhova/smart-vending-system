'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("beverage_ingredients", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      beverageId: {
        type: Sequelize.INTEGER,
        references: { model: "beverages", key: "id" },
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
      },
      unit: {
        type: Sequelize.ENUM("gr", "ml", "pcs"),
        allowNull: false
      }
    });
    await queryInterface.addConstraint("beverage_ingredients", {
      fields: ["beverageId", "ingredientId"],
      type: "unique",
      name: "uq_beverage_ingredient",
    });

  },

  async down(queryInterface) {
    await queryInterface.dropTable('beverage_ingredients');
  }
};
