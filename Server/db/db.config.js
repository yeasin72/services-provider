require('dotenv').config()
const console = require("console-emoji-log");
const colors = require('colors');
const mysql = require('mysql2')
const Tabel = require('../custom/tables.config')
const Init = require('../custom/init.config');

// const Sequelize = require('sequelize')

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, { host: process.env.DB_HOST, dialect: "mysql", operatorsAliases: false})

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
})

console.success(colors.yellow(`Database connected`));

const sql = "SHOW TABLES;"
Tabel.list.forEach(ele => {
    connection.query(sql, (err, result) => {
        if (err) {
            throw err
        }else{
            const data = result
            if (data.find(x => x.Tables_in_fixcode === ele) === undefined) {
                const comand = `CREATE TABLE ${ele} (${ele === "blogs" ? Init.blogs : ele === "users" ? Init.users : Init.auth}) AUTO_INCREMENT=1000`
                connection.query(comand, (error) => {
                    if (err) {
                        throw error
                    }
                })
            }
        }
    })
})

module.exports = connection

// module.exports = sequelize
// global.sequelize = sequelize


