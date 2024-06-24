const Sequelize = require("sequelize")
const {DATABASE_URL} = require("./config")

const sequelize = new Sequelize(DATABASE_URL)

async function connectToDatabase() {
  try {
    await sequelize.authenticate()
    console.log("connected to the database");
  } catch (error) {
    console.log("failed to connect to the database");
    return process.exit(1)
  }
  return null
}


module.exports = {connectToDatabase, sequelize}
