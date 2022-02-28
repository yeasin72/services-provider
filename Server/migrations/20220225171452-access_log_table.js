'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("server_logs", {
      id:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      authId: {
        type: Sequelize.STRING(300),
        allowNull: false,
        unique: true,
      },
      authdata: {
          type: Sequelize.TEXT,
          allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }, {initialAutoIncrement:1000})
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable("server_logs")
  }
};
