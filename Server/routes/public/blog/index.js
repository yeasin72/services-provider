const express = require('express')
const blogrouter = express.Router()
const colors = require('colors');
const connection = require('../../../db/db.config');
const Blogconfig = require('../../../custom/blog.config');
const wordcount = require('./../../../custom/utility.config')

// ==================>
// to get blog post
// ==================>
blogrouter.get('/', async (req, res) => {
    console.log(colors.cyan('GET ->'), colors.magenta('/api/public/bllog'));
    const sql = "SELECT * FROM blogs;"
    connection.query(sql, (err, result) => {
        if (err) {
            res.json({
                success: false,
                error: true,
                message: 'Internal server error',
                obj: null
            }).status(500)
        }else{
            res.json({
                success: true,
                error: false,
                message: 'collection found',
                obj: result
            }).status(200)
        }
    })
})


// ==================>
// get single blogs
// ==================>




// ==================>
// to create blog post
// ==================>
blogrouter.post('/', (req, res) => {
    console.log(colors.yellow('POST ->'), colors.magenta('/api/public/bllog'));
    const { title, desc, feature_img } = req.body
    const sql = `INSERT INTO blogs(${Blogconfig.title}, ${Blogconfig.description}, ${Blogconfig.createdTime}, ${Blogconfig.updateTime}, ${Blogconfig.img}) VALUES("${title}", "${desc}", "${Blogconfig.getcurrentdate()}", "${Blogconfig.getcurrentdate()}", "${feature_img}")`
    if (wordcount(title) < 2 || wordcount(desc) < 5 || wordcount(feature_img) != 1 || wordcount(feature_img) > 1) {
        res.status(403).json({
            success: false,
            error: true,
            message: 'Invalid details',
            obj: null
        })
    }else{
        connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    success: false,
                    error: true,
                    message: 'Internal server error',
                    obj: null
                })
            }else{
                res.status(200).json({
                    success: true,
                    error: false,
                    message: 'post Created',
                    obj: result
                })
            }
        })
    }
})


blogrouter.patch('/', (req, res) => {
    console.log(colors.magenta('PATCH ->'), colors.magenta('/api/public/bllog'));
    const { blogId, title, desc } = req.body
    const exect = blogs.find(x => x.id === parseInt(blogId))
    const index = blogs.indexOf(exect)
    blogs.splice(index, 1, { id: exect.id, title: title, desc: desc })
    res.json({
        success: true,
        message: 'updated',
        obj: blogs
    })
})

blogrouter.delete('/', (req, res) => {
    console.log(colors.red('DELETE ->'), colors.magenta('/api/public/bllog'));
    const { blogId } = req.body
    const exect = blogs.find(x => x.id === parseInt(blogId))
    const index = blogs.indexOf(exect)
    blogs.splice(index, 1)
    res.json({
            success: true,
            message: 'updated',
            obj: blogs
        })
})



module.exports = blogrouter