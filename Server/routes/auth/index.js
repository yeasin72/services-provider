const express = require('express')
const authrouter = express.Router()



authrouter.use('/profile', require('./profile'))


module.exports = authrouter