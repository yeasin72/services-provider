const { decryptToken, verifyRefreshToken, verifyAccessToken } = require('../../controllers/jwt.controler')
const setNewError = require('../../helper/error.helper')

const isAuth = async (req, res, next) => {
    if (req.headers?.authorization && req.cookies?.controler) {
        const bereartoken = req.headers?.authorization
        const encryptedaccesstoken = bereartoken.split(' ')[1]
        const accesstoken = decryptToken(encryptedaccesstoken)
        verifyAccessToken(accesstoken)
            .then(payload => {
                if (payload?.aud) {
                    const error = setNewError(req, 406, 'already looged in')
                    res.status(error.status).json(error)
                }
            })
            .catch(err => {
                if (err?.expiredAt) { 
                    const encryptedrefreshtoken = req.cookies.controler
                    const refreshtoken = decryptToken(encryptedrefreshtoken)
                    verifyRefreshToken(refreshtoken)
                        .then(refreshpayload => {
                            if (refreshpayload?.aud) {
                                const error = setNewError(req, 406, 'already looged in')
                                res.status(error.status).json(error)
                            }
                        })
                        .catch(err => {
                            if (err?.expiredAt) { 
                                next()
                                return
                            }else{
                                const error = setNewError(req, 500, 'Internal server errror')
                                res.status(error.status).json(error)
                            }
                        })
                }else{
                    const error = setNewError(req, 500, 'Internal server errror')
                    res.status(error.status).json(error)
                }
            })
    }else{
        next()
        return
    }
}

module.exports = isAuth