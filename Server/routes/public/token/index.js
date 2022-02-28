const express = require('express')
const tokenrouter = express.Router()
const bcrypt = require('bcrypt')
const { signAccessToken, signRefreshToken, encryptToken, audienceMaker } = require('../../../controllers/jwt.controler')
const setNewError = require('../../../helper/error.helper')
const responseHelper = require('../../../helper/response.helper')
const { userFindOne, createAccessLog, updateAccessLog } = require('../../../helper/user.helper')
const isAuth = require('../../../middleware/isauth')



tokenrouter.post('/', isAuth, (req, res) => {
    const { email, password } = req.body
    if (email && password) {
        userFindOne(email)
            .then(result => {
                if (result === !undefined) {
                    // if no user found
                    const error = setNewError(req, 400, "email / password not correct")
                    res.status(error.status).json(error)
                }else{
                    if (result?.dataValues.email === email) {
                        const data = result.dataValues
                        bcrypt.compare(password, data.user_password, (err, ispasswordCorrect) => {
                            if (!err && ispasswordCorrect) {
                                const aud = audienceMaker(data.id)
                                signRefreshToken(aud)
                                    .then(reftoken => {
                                        createAccessLog(aud, reftoken)
                                            .then(result => {
                                                if (result?.dataValues) {
                                                    const refreshdata = result.dataValues
                                                    signAccessToken(data.id)
                                                        .then(accToken => {
                                                            const encryptedAccesstoken = encryptToken(accToken)
                                                            const encryptedRefreshtoken = encryptToken(refreshdata.authdata)
                                                            const response = responseHelper(req, 200, {token: encryptedAccesstoken}, 'access restored')
                                                            res.status(response.status).cookie('controler', encryptedRefreshtoken).json(response)
                                                                        
                                                        })
                                                        .catch(() => {
                                                            // if creating token err
                                                            const error = setNewError(req, 500, "something went wrong")
                                                            res.status(error.status).json(error)
                                                        })
                                                }else{
                                                    console.log('something went wrong');
                                                }
                                            })
                                            .catch(err => {
                                                if (err?.errors[0]?.validatorKey === "not_unique") {
                                                    // if user already in database
                                                    updateAccessLog(aud, reftoken)
                                                        .then(result => {
                                                            if (result[0]) {
                                                                const refreshdata = data.id
                                                                signAccessToken(refreshdata)
                                                                    .then(accToken => {
                                                                        const encryptedAccesstoken = encryptToken(accToken)
                                                                        const encryptedRefreshtoken = encryptToken(reftoken)
                                                                        const response = responseHelper(req, 200, {token: encryptedAccesstoken}, 'access restored')
                                                                        res.status(response.status).cookie('controler', encryptedRefreshtoken).json(response)
                                                                        
                                                                    })
                                                                    .catch((err) => {
                                                                        // if creating token err
                                                                        const error = setNewError(req, 500, "something went wrong 2")
                                                                        res.status(error.status).json(error)
                                                                    })
                                                            }else{
                                                                console.log('something went wrong');
                                                            }
                                                        })
                                                        .catch(() => {
                                                            // if something wrong with database
                                                            const error = setNewError(req, 500, 'Internal server error')
                                                            res.status(error.status).json(error)
                                                        })
                                                }else{
                                                    // if something wrong with database
                                                    const error = setNewError(req, 500, 'Internal server error')
                                                    res.status(error.status).json(error)
                                                }
                                            })
                                    })
                                    .catch(() => {
                                        // if creating token err
                                        const error = setNewError(req, 500, "something went wrong")
                                        res.status(error.status).json(error)
                                    })
                            }else{
                                // if no user found
                                const error = setNewError(req, 400, "email / password not correct")
                                res.status(error.status).json(error)
                            }
                        })
                    }else{
                        // if any problem with database
                        const error = setNewError(req, 500, "something went wrong")
                        res.status(error.status).json(error)
                    }
                }
            })
            .catch(() => {
                // if any problem with database
                const error = setNewError(req, 500, "Internal server err")
                res.status(error.status).json(error)
            })
    }else{
        // if any problem with database
        const error = setNewError(req, 422, "Invalid data")
        res.status(error.status).json(error)
    }
}) 

module.exports = tokenrouter