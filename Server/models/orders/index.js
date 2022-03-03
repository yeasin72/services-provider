const Sequelize = require('sequelize')

module.exports = sequelize.define("orders", {
id:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    service_name:{
        type: Sequelize.TEXT,
        allowNull: false,
    },
    budget_price:{
        type: Sequelize.STRING(10),
        allowNull: false
    },
    price:{
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 0
    },
    quantity: {
        type: Sequelize.INTEGER(3),
        allowNull: false,
        defaultValue: 1
    },
    order_status:{
        type: Sequelize.STRING(1),
        allowNull: false,
        defaultValue: '1'
    },
    ispaid:{
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue: false
    },
    serviceId:{
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    adminId:{
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    userId:{
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    }, {initialAutoIncrement:1000})