const express = require('express')
const profilerouter = express.Router()

profilerouter.get('/', (req, res) => {
    console.log("request");
})

module.exports = profilerouter