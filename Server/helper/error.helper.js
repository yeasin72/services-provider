const createError = require('http-errors')


function setNewError(status, message) {
    const errmsg = createError(status, message)
    return {
        status: status,
        error: true,
        success: false,
        message: errmsg.message,
        objectVal: null
    }
}


module.exports = setNewError