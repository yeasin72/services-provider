const Sequelize = require('sequelize')

module.exports = sequelize.define("services", {
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
        type: Sequelize.ARRAY(Sequelize.STRING(50)),
        allowNull: true
    }
}, {initialAutoIncrement:1000})