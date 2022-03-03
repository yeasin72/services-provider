const { nameValidation, emailValidation, passwordValidation } = require('../../validation/user.validation')
const setNewError = require('../../helper/error.helper')
const removeImgFile = require('../../helper/img.delete.helper')

function isvalidData(req, res, next){
    const { name, email, password } = req.body
    
    if (!name || !email || !password) {
        removeImgFile(req.file.filename)
        const error = setNewError(req, 422, 'Invalid information')
        res.status(error.status).json(error)
    }else{ // if any item not empty
        if (!nameValidation(name)) { // name not valid
            removeImgFile(req.file.filename)
            const error = setNewError(req, 422, "Name isn't valid")
            res.status(error.status).json(error)
        }
        if (!emailValidation(email)) {// email not valid
            removeImgFile(req.file.filename)
            const error = setNewError(req, 422, "email address not valid")
            res.status(error.status).json(error)
        }
        if (!passwordValidation(password)) { // password  not valid
            removeImgFile(req.file.filename)
            const error = setNewError(req, 422, "Please provide a strong password")
            res.status(error.status).json(error)
        }
        if (nameValidation(name) && emailValidation(email) && passwordValidation(password)) {
            next()
            return
        }
    }
}

module.exports =  isvalidData