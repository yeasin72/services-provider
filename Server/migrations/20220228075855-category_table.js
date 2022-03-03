'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("categories", {
        id:{
          type: Sequelize.INTEGER(11),
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        categoryname: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        categorydescription: {
          type: Sequelize.STRING(300),
          allowNull: true
        },
        adminId: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }, {initialAutoIncrement:1000})
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable("categories")
  }
};
