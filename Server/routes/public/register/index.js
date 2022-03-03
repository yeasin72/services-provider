const express = require('express')
const registerRouter = express.Router()
const bcrypt = require('bcrypt')
const saltround = process.env.SALTROUND
const setNewError = require('../../../helper/error.helper')
const responseHelper = require('../../../helper/response.helper')
const { createUser } = require('../../../helper/user.helper')
const isAuth = require('../../../middleware/isauth')
const isvalidData = require('../../../middleware/validate')
const upload = require('../../../helper/single.uplload.helper')
const removeImgFile = require('../../../helper/img.delete.helper')



registerRouter.post('/', isAuth, upload.single('avatar'), isvalidData, async (req, res) => {
    const { name, email, password } = req.body
    const avatar = req.file.path ? req.file.path : null
    // if all item valid
    bcrypt.genSalt(parseInt(saltround), (salterr, salt) => {
        if (!salterr) {
            bcrypt.hash(password, salt, (hasherr, encryptedPassword) => { // create a hash password
                if (!hasherr) {
                    createUser(email, encryptedPassword, name, avatar)
                        .catch(err => {
                            if (err?.errors[0]?.validatorKey === "not_unique") {
                                // if user already in database
                                removeImgFile(req.file.filename)
                                const error = setNewError(req, 422, err.errors[0].message)
                                res.status(error.status).json(error)
                            }else{
                                // if something wrong with database
                                removeImgFile(req.file.filename)
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
                    removeImgFile(req.file.filename)
                    const error = setNewError(req, 500, "Internal server err")
                    res.status(error.status).json(error)
                }
            })
        }
    })
    
})

registerRouter.put('/', (req, res) => {

})

module.exports = registerRouter