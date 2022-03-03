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
    budget:{
        type: Sequelize.INTEGER(8),
        allowNull: false
    },
    duration:{
        type: Sequelize.STRING(4),
        allowNull: false
    },
    services_description:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    service_img_url:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    categoryId: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    authorId: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    }
}, {initialAutoIncrement:1000})