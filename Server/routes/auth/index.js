const express = require('express')
const authrouter = express.Router()

authrouter.use(express.static('../../userimg'))
authrouter.use('/profile', require('./profile'))
authrouter.use('/order', require('./orders'))


module.exports = authrouter