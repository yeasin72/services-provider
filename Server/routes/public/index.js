const express = require('express')
const publicrouter = express.Router()


publicrouter.use('/blog', require('./blog'))
publicrouter.use('/register', require('./register'))
publicrouter.use('/token', require('./token'))

module.exports = publicrouter