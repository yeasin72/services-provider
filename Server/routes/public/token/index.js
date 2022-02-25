const express = require('express')
const tokenrouter = express.Router()
const connection = require('../../../db/db.config')
const bcrypt = require('bcrypt')
const userConfig = require('../../../custom/user.config')
const { signAccessToken, signRefreshToken, encryptToken } = require('../../../controllers/jwt.controler')
const setNewError = require('../../../helper/error.helper')
const responseHelper = require('../../../helper/response.helper')
const { statusControler } = require('../../../controllers/error.controler')


tokenrouter.post('/', (req, res) => {
    const { email, password } = req.body
    const findsql = `SELECT * FROM ${userConfig.tablename} WHERE ${userConfig.email} = "${email}";`
    connection.query(findsql, (finderr, findresult) => {
        if (!finderr) {
            const data = findresult[0]
            if (data?.user_password) {
                bcrypt.compare(password, data.user_password, (err, result) => {
                    if (!err && result) {
                        signRefreshToken(data.id)
                            .then(refreshtoken => {
                                const sql = `INSERT INTO server_log (authdata) VALUES("${refreshtoken}");`
                                connection.query(sql, (logerror, logback) => {
                                    if (logerror) {
                                        const error = setNewError(500, "Internal server error")
                                        statusControler('Error', req)
                                        res.status(500).json(error)
                                    }else{
                                        const tokenID = logback?.insertId
                                        signAccessToken(tokenID)
                                            .then(token => {
                                                statusControler('Success', req)
                                                const modifiedAccessToken = encryptToken(token)
                                                const modifiedRefreshToken = encryptToken(refreshtoken)
                                                const response = responseHelper(201, {accessToken: modifiedAccessToken}, 'token found')
                                                res.status(201).cookie('verificationToken', modifiedRefreshToken, {
                                                    httpOnly: true
                                                }).json(response)
                                            })
                                            .catch(() => {
                                                const error = setNewError(500, "Internal server error")
                                                statusControler('Error', req)
                                                res.status(500).json(error)
                                            })
                                    }
                                })
                            })
                            .catch(() => {
                                const error = setNewError(500, "Internal server error")
                                statusControler('Error', req)
                                res.status(500).json(error)
                            })

                        
                    }else{
                        const error = setNewError(404, "Invalid email or password")
                        statusControler('Warn', req)
                        res.status(404).json(error)
                    }
                })
            }
        }
    })
}) 

module.exports = tokenrouter