'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("beverages", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      basePrice: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "categories",
          key: "id",
        },
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable("beverages")
  }
};
