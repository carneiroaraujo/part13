const Membership = require("./membership")
const Note = require("./note")
const Team = require("./team")
const User = require("./user")

User.hasMany(Note)
Note.belongsTo(User)

User.belongsToMany(Team, { through: Membership })
Team.belongsToMany(User, { through: Membership })

module.exports = {
  Note, User, Team, Membership
}