const express = require('express')
const isAuthenticated = require('../../middleware/authentication')
const authrouter = express.Router()



authrouter.use('/profile', isAuthenticated, require('./profile'))

module.exports = authrouter