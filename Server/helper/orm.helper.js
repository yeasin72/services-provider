module.exports = async () => {
    const Users = require('../models/users')
    const Services = require('../models/service')
    const Reviews = require('../models/reviews')
    const Categories = require('../models/categories')
    const Orders = require('../models/orders')
    const Blogs = require('../models/blogs')
    const Admins = require('../models/admins')

    Users.hasMany(Orders, { as: "orders", foreignKey: "userId" })
    Users.hasMany(Reviews, { as: "reviews", foreignKey: "userId" })
    Services.hasMany(Orders, { as: "orders", foreignKey: "serviceId" })
    Services.hasMany(Reviews, { as: "reviews", foreignKey: "serviceId" })
    Services.hasMany(Categories, { as: "categories", foreignKey: "categoryId" })
    Admins.hasMany(Services, { as: "services", foreignKey: "authorId" })
    Blogs.hasMany(Categories, { as: "categories", foreignKey: "categoryId" })
    Admins.hasMany(Blogs, { as: "blogs", foreignKey: "authorId" })

    Orders.belongsTo(Users, { as: "user", foreignKey: "userId"})
    Reviews.belongsTo(Users, { as: "user", foreignKey: "userId"})
    Orders.belongsTo(Services, { as: "service", foreignKey: "serviceId" })
    Reviews.belongsTo(Services, { as: "service", foreignKey: "serviceId" })
    Categories.belongsTo(Services, { as: "service", foreignKey: "categoryId" })
    Categories.belongsTo(Blogs, { as: "blog", foreignKey: "categoryId" })
    Blogs.belongsTo(Admins, { as: "author", foreignKey: "authorId" })
    Services.belongsTo(Admins, { as: "author", foreignKey: "authorId" })
}