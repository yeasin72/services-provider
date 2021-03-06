'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("services", {
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
      budget:{
        type: Sequelize.INTEGER(8),
        allowNull: false
      },
      duration:{
        type: Sequelize.STRING(4),
        allowNull: false
      },
      services_description:{
        type: Sequelize.TEXT,
        allowNull: false
      },
      service_img_url:{
        type: Sequelize.TEXT,
        allowNull: false
      },
      categoryId: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      authorId: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }, {initialAutoIncrement:1000})
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable('services')
  }
};
