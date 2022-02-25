const { decryptToken } = require("../../controllers/jwt.controler");

function isAuthenticated(req, res, next) {
    const encryptedtoken = req?.cookies?.verificationToken
    const token = decryptToken(encryptedtoken)
    console.log(token);
    next()
}

module.exports = isAuthenticated