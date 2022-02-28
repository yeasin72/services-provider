const Sequelize = require('sequelize')

module.exports = sequelize.define("server_logs", {
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
    }
}, {initialAutoIncrement:1000});