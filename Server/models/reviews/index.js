const Sequelize = require('sequelize')

module.exports = sequelize.define("reviews", {
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
    }
}, {initialAutoIncrement:1000})