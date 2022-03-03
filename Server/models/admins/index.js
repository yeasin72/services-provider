const Sequelize = require('sequelize')

module.exports = sequelize.define("admins", {
    id:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    email:{
        type: Sequelize.STRING(400),
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(80),
        allowNull: false,
    }
}, {initialAutoIncrement:1000})