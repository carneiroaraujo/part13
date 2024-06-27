const Blog = require("./blog")
const User = require("./user")

User.hasMany(Blog)
Blog.belongsTo(User)

Blog.sync({alter: true})
User.sync({alter: true})

console.log("Yep. The index.js file of the models folder is properly being executed.");

module.exports = {
  Blog, User
}