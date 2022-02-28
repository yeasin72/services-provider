'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("orders", {
      id:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      product_title:{
        type: Sequelize.TEXT,
        allowNull: false,
      },
      price:{
        type: Sequelize.STRING(10),
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER(3)
      },
      servicesId:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }, {initialAutoIncrement:1000})
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable("orders")
  }
};
