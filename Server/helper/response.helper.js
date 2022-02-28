const { statusControler } = require('../controllers/error.controler')

function responseHelper(req, status, data, mess = 'response successfully done') {
    if (status > 199 && status < 300) {
        statusControler('Success', req)
    }
    return {
        status: status,
        success: true,
        error: false,
        message: mess,
        objectVal: data
    }
}

module.exports = responseHelper