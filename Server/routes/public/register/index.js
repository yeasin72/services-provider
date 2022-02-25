const express = require('express')
const registerRouter = express.Router()
const connection = require('../../../db/db.config')
const Insertsql = require('../../../controllers/insert.controller')
const { nameValidation, emailValidation, passwordValidation, avatarValidation } = require('../../../validation/user.validation')
const bcrypt = require('bcrypt')
const userConfig = require('../../../custom/user.config')
const { statusControler } = require('../../../controllers/error.controler')
const saltround = process.env.SALTROUND


registerRouter.post('/', (req, res) => {
    const { name, email, password, avatar } = req.body
    if (!name || !email || !avatar || !password) {
        statusControler('Warn', req)
        res.status(400).json({
            error: true,
            success: false,
            message: 'Invalid Information'
        })
    }else{
        if (!nameValidation(name)) {
            statusControler('Warn', req)
            res.status(400).json({
                error: true,
                success: false,
                message: 'Invalid name'
            })
        }
        if (!emailValidation(email)) {
            statusControler('Warn', req)
            res.status(400).json({
                error: true,
                success: false,
                message: 'Invalid e-mail address'
            })
        }
        if (!passwordValidation(password)) {
            statusControler('Warn', req)
            res.status(400).json({
                error: true,
                success: false,
                message: 'Please provide a strong password'
            })
        }
        if (!avatarValidation(avatar)) {
            statusControler('Warn', req)
            res.status(400).json({
                error: true,
                success: false,
                message: 'avatar URL not valid'
            })
        }
    
        if (nameValidation(name) && emailValidation(email) && passwordValidation(password) && avatarValidation(avatar)) {
            bcrypt.genSalt(parseInt(saltround), (salterr, salt) => {
                if (!salterr) {
                    bcrypt.hash(password, salt, (hasherr, encryptedPassword) => {
                        if (!hasherr) {
                            const findsql = `SELECT * FROM ${userConfig.tablename} WHERE ${userConfig.email} = "${email}"`
                            connection.query(findsql, (finderr, found) => {
                                if (!finderr) {
                                    const data = found
                                    if (data.length === 0) {
                                        const sql = Insertsql.user+ `VALUES ("${name}", "${email}", "${encryptedPassword}", "${avatar}", "${userConfig.getcurrentdate()}", "${userConfig.getcurrentdate()}");`
                                        connection.query(sql, (err, result) => {
                                            if (err) {
                                                statusControler('Error', req)
                                                res.status(500).json({
                                                    error: true,
                                                    success: false,
                                                    message: 'Internal server error'
                                                })
                                            }else{
                                                statusControler('Success', req)
                                                res.status(201).json({
                                                    error: false,
                                                    success: true,
                                                    message: 'User created',
                                                    objectVal: result
                                                })
                                            }
                                        })
                                    }else{
                                        statusControler('Warn', req)
                                        res.status(400).json({
                                            error: true,
                                            success: false,
                                            message: 'user already in database'
                                        })
                                    }
                                }
                            })
                        }
                    })
                }
            })
        }
    }
    
})

registerRouter.put('/', (req, res) => {

})

module.exports = registerRouter