const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './userimg')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname)
    }
})
const options = {
    storage: storage,
    limits: {
        fileSize: `${1024 * 1024 * 5}`
    },
    fileFilter: (req, file, cb) => {
        const fileType = ['image/gif', 'image/jpeg', 'image/png']
        if (file.mimetype === fileType[0] || file.mimetype === fileType[1] || file.mimetype === fileType[2]) {
            cb(null, true)
        }else{
            cb(null, false)
        }

    }
}
const upload = multer(options)

module.exports = upload