const jwt = require('jsonwebtoken')
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.ENCRYPTION_SECRET_KEY);

module.exports = {
    signAccessToken : (tokenid) => {
        
        return new Promise((resolve, reject) => {
            const payload = {}
            const privateKey = process.env.TOKEN_PRIVATE_KEY
            const options = {
                expiresIn: '10s',
                issuer: process.env.TOKEN_ISSUER,
                audience: `${tokenid}`,
            }
            jwt.sign(payload, privateKey, options, (err, token) => {
                if (err) reject(err)
                resolve(token)
            })
        })
    },
    signRefreshToken : (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                type: "ref"
            }
            privateKey = process.env.REFRESH_TOKEN_KEY
            options = {
                expiresIn: '1y',
                issuer: process.env.TOKEN_ISSUER,
                audience: `${userId}`,
            }
            jwt.sign(payload, privateKey, options, (err, token) => {
                if (err) reject(err)
                resolve(token)
            })
        })
    },
    encryptToken: (token) => {
        return cryptr.encrypt(token)
    },
    decryptToken: (encryptedtoken) => {
        return cryptr.decrypt(encryptedtoken)
    },
}