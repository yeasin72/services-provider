const User = require('../models/users')
const Access = require('../models/server_log')
module.exports = {
    userFindOne: async (email) => {
        return await User.findOne({where: { email: email }})
    },
    userIsAuthenticated: async (id) => {
        return await User.findOne({where: { id }})
    },
    createUser: async (email, user_password, fullname, avatar) => {
        return await User.create({
            email,
            user_password,
            fullname,
            avatar
        })
    },
    createAccessLog: async (aud, token) => {
        return await Access.create({
            authId: aud,
            authdata: token
        })
    },
    refreshFindOne: async (authid) => {
        return await Access.findOne({where: { authId: authid }})
    },
    accessFindOne: async (id) => {
        return await Access.findOne({where: { id: id }})
    },
    updateAccessLog: async (authid, token) => {
        
        return await Access.update({ authdata: token } ,{ where: { authId: authid } })
    }
}