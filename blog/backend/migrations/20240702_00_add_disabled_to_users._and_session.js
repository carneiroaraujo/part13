const { QueryInterface, DataTypes } = require("sequelize")

async function up({context:queryInterface}) {
  await queryInterface.addColumn("users", "disabled", {
    type: DataTypes.BOOLEAN,
    default: false
  })
  await queryInterface.createTable("sessions", {
    token: {
      type: DataTypes.TEXT,
      primaryKey: true,
      defaultValue: false
    }})
}


async function down({context:queryInterface}) {
  await queryInterface.removeColumn("users", "disabled")
  await queryInterface.dropTable("users")
  
}

module.exports = {
  up, down
}