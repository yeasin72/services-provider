const express = require('express')
const authrouter = express.Router()

authrouter.use('/profile', require('./profile'))
authrouter.use('/order', require('./orders'))


module.exports = authrouter