const fs = require('fs')

function removeImgFile(filename) {
    fs.unlink(`./userimg/${filename}`, err => {
        if (err) throw err
    })
}

module.exports = removeImgFile