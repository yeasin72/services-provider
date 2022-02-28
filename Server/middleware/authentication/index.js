const { decryptToken, verifyAccessToken, verifyRefreshToken } = require("../../controllers/jwt.controler");
const { refreshFindOne, userIsAuthenticated } = require('../../helper/user.helper')
const setNewError = require('../../helper/error.helper')

const isAuthenticated = async (req, res, next) => {
    if (req.headers?.authorization && req.cookies?.controler) {
        const bereartoken = req.headers?.authorization
        const encryptedaccesstoken = bereartoken.split(' ')[1]
        const accesstoken = decryptToken(encryptedaccesstoken)
        verifyAccessToken(accesstoken) // check is access token is valid
            .then(payload => {
                if (payload?.aud) { 
                    const aud = parseInt(payload.aud)
                    userIsAuthenticated(aud)
                        .then(authenticated => {
                            if (authenticated?.dataValues?.id === aud) { // if valid user
                                next()
                                return
                            }else{
                                const error = setNewError(req, 401, 'Unauthorized')
                                res.status(error.status).json(error)
                            }
                        })
                        .catch(err => {
                            const error = setNewError(req, 500, 'Internal server errror')
                            res.status(error.status).json(error)
                        })
                }else{
                    const error = setNewError(req, 401, 'Unauthorized')
                    res.status(error.status).json(error)
                }
            })
            .catch((err) => {
                if (err?.expiredAt) { // if access token expire
                    const encryptedrefreshtoken = req.cookies.controler
                    const refreshtoken = decryptToken(encryptedrefreshtoken)
                    verifyRefreshToken(refreshtoken) // check refresh token
                        .then(payload => {
                            if (payload?.aud) {
                                const aud = payload.aud
                                refreshFindOne(aud)
                                    .then(result => {
                                        if (result?.dataValues?.authId === aud) { // is refresh token valid or not
                                            next()
                                            return
                                        }else{
                                            const error = setNewError(req, 401, 'Unauthorized')
                                            res.status(error.status).json(error)
                                        }
                                    })
                                    .catch(() => {
                                        const error = setNewError(req, 500, 'Internal server errror')
                                        res.status(error.status).json(error)
                                    })
                            }
                        })
                        .catch(err => {
                            if (err?.expiredAt) { // if no valid token
                                const error = setNewError(req, 401, 'Unauthorized')
                                res.status(error.status).json(error)
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
        const error = setNewError(req, 401, 'Unauthorized')
        res.status(error.status).json(error)
    }
    
}

module.exports = isAuthenticated