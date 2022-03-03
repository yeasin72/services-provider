const validator = require('validator');

class Uservalidation {
    nameValidation(name) {
            if (name.split(' ').length >= 1) {
                return true
            }else{
                return false
            }
    }

    emailValidation(email) {
        if (validator.isEmail(email)) {
            return true
        }else{
            return false
        }
    }
    passwordValidation (password) {
        if (validator.isStrongPassword(password)) {
            return true
        }else{
            return false
        }
    }
    
}

module.exports = new Uservalidation