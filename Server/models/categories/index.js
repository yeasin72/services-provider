const Sequelize = require('sequelize')

module.exports = sequelize.define("categories", {
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
    adminId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    categorydescription: {
        type: Sequelize.STRING(300),
        allowNull: true
    }
}, {initialAutoIncrement:1000})