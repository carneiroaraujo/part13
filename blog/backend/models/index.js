const Blog = require("./blog")
Blog.sync()
console.log("Yep. The index.js file of the models folder is properly executed.");
module.exports = {
  Blog
}