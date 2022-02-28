const Sequelize = require('sequelize')

module.exports = sequelize.define("orders", {
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
    }
    }, {initialAutoIncrement:1000})