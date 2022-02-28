'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("services", {
      id:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      services_name:{
        type: Sequelize.TEXT,
        allowNull: false
      },
      price:{
        type: Sequelize.INTEGER(5),
        allowNull: false
      },
      services_description:{
        type: Sequelize.TEXT,
        allowNull: false
      },
      services_category: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }, {initialAutoIncrement:1000})
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable('services')
  }
};
