const Sequelize = require('sequelize')

module.exports = sequelize.define("users", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: Sequelize.STRING(300),
        unique: true,
        allowNull: false,
    },
    user_password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    fullname:{
        type: Sequelize.STRING(80),
        allowNull: false
    },
    avatar: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    isveryified:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {initialAutoIncrement:1000})