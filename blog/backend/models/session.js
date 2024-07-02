const {Model, DataTypes} = require("sequelize")
const {sequelize} = require("../util/db")

class Session extends Model {}

Session.init({
  token: {
    type: DataTypes.TEXT,
    primaryKey: true,
    defaultValue: false
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: "session"

})


module.exports = Session