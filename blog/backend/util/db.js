const {DATABASE_URL} = require("./config")
const Sequelize = require("sequelize")
const sequelize = new Sequelize(DATABASE_URL)

async function ConnectToDatabase() {
  try {
    await sequelize.authenticate()
    console.log("Connected to the database");
  } catch (error) {
    console.log("Failed to connect to the database ");
    return process.exit(1)
  }
  return null
}


module.exports = {ConnectToDatabase, sequelize}