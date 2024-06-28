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
  yearWritten: {
    type: DataTypes.INTEGER,
    validate: {
      isBetweenInterval(value) {
        if (value > new Date().getFullYear() || value < 1991) {
          throw new Error("year written attribute must be between 1991 and the current year")
        }
      }
    }
  }
},{
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: "blog"
})

module.exports = Blog
