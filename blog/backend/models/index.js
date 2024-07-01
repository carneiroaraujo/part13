const Blog = require("./blog")
const User = require("./user")
const UserBlogs = require("./user_blogs")

User.hasMany(Blog, {as: "blogs"})
Blog.belongsTo(User)

User.belongsToMany(Blog, {through: UserBlogs, as:"readings"})
Blog.belongsToMany(User, {through: UserBlogs})

console.log("Yep. The index.js file of the models folder is properly being executed.");

module.exports = {
  Blog, User, UserBlogs
}