const {sequelize} = require("../util/db")
const {DataTypes, Model} = require("sequelize")

class Blog extends Model {}

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  author: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
},{
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: "blog"
})

module.exports = Blog
