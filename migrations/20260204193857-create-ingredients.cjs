'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("ingredients", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      unit: {
        type: Sequelize.ENUM("gr", "ml", "pcs"),
        allowNull: false
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable("ingredients")
  }
};
