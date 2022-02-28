const express = require('express')
const router = express.Router()
const isAuthenticated = require('../middleware/authentication')

router.use('/auth', isAuthenticated, require('./auth'))

router.use('/public', require('./public'))

module.exports = router