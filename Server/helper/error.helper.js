const createError = require('http-errors')
const { statusControler } = require('../controllers/error.controler')



function setNewError(req, status, message = "something went wrong") {
    const errmsg = createError(status, message)
    if (status > 399 && status < 500) {
        statusControler('Warn', req)
    }if (status > 499 && status < 600) {
        statusControler('Error', req)
    }
    return {
        status: status,
        error: true,
        success: false,
        message: errmsg.message,
        objectVal: null
    }
}


module.exports = setNewError