const {DataTypes} = require("sequelize")

async function up({context: queryInterface}) {
  
  await queryInterface.addColumn("blogs", "year_written", {
    type: DataTypes.INTEGER,
    validate: {
      isBetweenInterval(value) {
        if (value > new Date().getFullYear() || value < 1991) {
          throw new Error("year written attribute must be between 1991 and the current year")
        }
      }
    }
  })

}
async function down({context: queryInterface}) {
  await queryInterface.removeColumn("blogs", "year_written")
}

module.exports = {
  up, down
}