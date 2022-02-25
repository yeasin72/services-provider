const express = require('express')
const router = express.Router()

router.use('/auth',  require('./auth'))

router.use('/public', require('./public'))

module.exports = router