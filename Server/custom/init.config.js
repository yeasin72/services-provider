const Blogconfig = require('./blog.config')
const userConfig = require('./user.config')
class Init {
    auth=`id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, authdata TEXT NOT NULL`
    blogs=`id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, ${Blogconfig.title} VARCHAR(100) NOT NULL, ${Blogconfig.description} TEXT NOT NULL, ${Blogconfig.createdTime} DATETIME NOT NULL, ${Blogconfig.updateTime} DATETIME NOT NULL, ${Blogconfig.img} TEXT`
    users=`id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, ${userConfig.email} VARCHAR(200) NOT NULL, ${userConfig.password} TEXT NOT NULL, ${userConfig.img} TEXT NOT NULL, ${userConfig.fullname} VARCHAR(100) NOT NULL, ${userConfig.createdTime} DATETIME NOT NULL, ${userConfig.updateTime} DATETIME NOT NULL`
}
module.exports = new Init