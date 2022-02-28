const jwt = require('jsonwebtoken')
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.ENCRYPTION_SECRET_KEY);

module.exports = {
    signAccessToken : (tokenid) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const privateKey = process.env.TOKEN_PRIVATE_KEY
            const options = {
                expiresIn: '1m',
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
                expiresIn: '1d',
                issuer: process.env.TOKEN_ISSUER,
                audience: userId,
            }
            jwt.sign(payload, privateKey, options, (err, token) => {
                if (err) reject(err)
                resolve(token)
            })
        })
    },
    verifyAccessToken: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.TOKEN_PRIVATE_KEY, (err, decodedvalue) => {
                if (err) reject(err)
                resolve(decodedvalue)
            })
        })
    },
    verifyRefreshToken: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.REFRESH_TOKEN_KEY, (err, decodedvalue) => {
                if (err) reject(err)
                resolve(decodedvalue)
            })
        })
    },
    encryptToken: (token) => {
        return cryptr.encrypt(token)
    },
    decryptToken: (encryptedtoken) => {
        return cryptr.decrypt(encryptedtoken)
    },
    audienceMaker: (id) => {
        return `${id * 500}_haha`
    },
    audienceRetriever: (aud) => {
        const data = aud.split('_')[0]
        const id = parseInt(data) / 500
        return id
    }
}