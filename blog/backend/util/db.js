const {DATABASE_URL} = require("./config")
const Sequelize = require("sequelize")
const sequelize = new Sequelize(DATABASE_URL)

const {Umzug, SequelizeStorage} = require("umzug")

const migrationConf = {
  migrations: {glob: "migrations/*.js"},
  storage: new SequelizeStorage({sequelize, tableName: "migrations"}),
  context: sequelize.getQueryInterface(),
  logger: console
}

async function runMigration() {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log("Migrations up to date", {
    files: migrations.map(mig => mig.name)
  });
}
async function rollbackMigration() {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()


}

async function ConnectToDatabase() {
  try {
    await sequelize.authenticate()
    await runMigration()
    console.log("Connected to the database");
  } catch (error) {
    console.log("Failed to connect to the database ", error.message);
    return process.exit(1)
  }
  return null
}


module.exports = {ConnectToDatabase, sequelize, rollbackMigration}