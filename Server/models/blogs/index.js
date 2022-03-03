const Sequelize = require('sequelize')

module.exports = sequelize.define("blogs", {
    id:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    blogTitle: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    blogContent: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    categoryId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    authorId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
    }
}, {initialAutoIncrement:1000})