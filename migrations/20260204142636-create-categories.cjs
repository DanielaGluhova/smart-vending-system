'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("categories", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      categoryName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable("categories");
  }
};
