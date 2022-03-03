const express = require('express')
const blogrouter = express.Router()
const wordcount = require('./../../../custom/utility.config')
const upload = require('../../../helper/single.uplload.helper')


blogrouter.post('/', upload.single('img'), (req, res) => {
    console.log(req.body.name);
    res.json({
        working: true
    })
})

module.exports = blogrouter