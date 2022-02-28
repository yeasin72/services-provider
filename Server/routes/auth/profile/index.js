const express = require('express')
const profilerouter = express.Router()

profilerouter.get('/', (req, res) => {
    res.status(200).json({
        message: "you can access data"
    })
})

module.exports = profilerouter