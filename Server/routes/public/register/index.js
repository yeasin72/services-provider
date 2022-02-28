const express = require('express')
const registerRouter = express.Router()
const { nameValidation, emailValidation, passwordValidation, avatarValidation } = require('../../../validation/user.validation')
const bcrypt = require('bcrypt')
const { statusControler } = require('../../../controllers/error.controler')
const saltround = process.env.SALTROUND
const setNewError = require('../../../helper/error.helper')
const responseHelper = require('../../../helper/response.helper')
const { createUser } = require('../../../helper/user.helper')
const isAuth = require('../../../middleware/isauth')





registerRouter.post('/', isAuth, async (req, res) => {
    const { name, email, password, avatar } = req.body
    // is empty
    if (!name || !email || !avatar || !password) {
        const error = setNewError(req, 422, 'Invalid information')
        res.status(error.status).json(error)
    }else{ // if any item not empty
        if (!nameValidation(name)) { // name not valid
            const error = setNewError(req, 422, "Name isn't valid")
            res.status(error.status).json(error)
        }
        if (!emailValidation(email)) {// email not valid
            const error = setNewError(req, 422, "email address not valid")
            res.status(error.status).json(error)
        }
        if (!passwordValidation(password)) { // password  not valid
            const error = setNewError(req, 422, "Please provide a strong password")
            res.status(error.status).json(error)
        }
        if (!avatarValidation(avatar)) { // avatar picture not valid 
            const error = setNewError(req, 422, "pleasse provide a valid avarar")
            res.status(error.status).json(error)
        }
        if (nameValidation(name) && emailValidation(email) && passwordValidation(password) && avatarValidation(avatar)) {
            // if all item valid
            bcrypt.genSalt(parseInt(saltround), (salterr, salt) => {
                if (!salterr) {
                    bcrypt.hash(password, salt, (hasherr, encryptedPassword) => { // create a hash password
                        if (!hasherr) {
                            createUser(email, encryptedPassword, name, avatar)
                                .catch(err => {
                                    if (err?.errors[0]?.validatorKey === "not_unique") {
                                        // if user already in database
                                        const error = setNewError(req, 422, err.errors[0].message)
                                        res.status(error.status).json(error)
                                    }else{
                                        // if something wrong with database
                                        const error = setNewError(req, 500, 'Internal server error')
                                        res.status(error.status).json(error)
                                    }
                                })
                                .then(data => {
                                    // if successfully created user
                                    if (data?.dataValues) {
                                        if (data.dataValues.email === email) {
                                            const response = responseHelper(req, 201, null, 'user created')
                                            res.status(201).json(response)
                                        }
                                    }else{
                                        console.log('trying with invlid data to create user ');
                                    }
                                })
                                
                        }else{
                            // if got error to hash password
                            const error = setNewError(req, 500, "Internal server err")
                            res.status(error.status).json(error)
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