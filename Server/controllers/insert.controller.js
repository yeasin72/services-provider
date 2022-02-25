const userconfig = require('../custom/user.config')
class Insertsql {
    // user sql
    user=`INSERT INTO ${userconfig.tablename} (${userconfig.fullname}, ${userconfig.email}, ${userconfig.password}, ${userconfig.img}, ${userconfig.createdTime}, ${userconfig.updateTime}) ` 
}

module.exports = new Insertsql