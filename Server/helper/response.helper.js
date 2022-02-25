
function responseHelper(status, data, mess = 'response successfully done') {
    return {
        status: status,
        success: true,
        error: false,
        message: mess,
        objectVal: data
    }
}

module.exports = responseHelper