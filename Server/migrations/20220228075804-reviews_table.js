'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable("reviews", {
      id:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: false 
      },
      rating: {
        type: Sequelize.FLOAT(2),
        allowNull: false
      },
      orderId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      serviceId: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }, {initialAutoIncrement:1000})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('reviews');
  }
};
