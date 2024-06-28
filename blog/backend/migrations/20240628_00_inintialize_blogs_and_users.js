const {DataTypes} = require("sequelize")

async function up({context: queryInterface}) {
  await queryInterface.createTable("users", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, 
      } 
    },
    created_at: {
      type: DataTypes.DATE
    },
    updated_at: {
      type: DataTypes.DATE
    }
  })

  await queryInterface.createTable("blogs", {
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
    created_at: {
      type: DataTypes.DATE
    },
    updated_at: {
      type: DataTypes.DATE
    }
  })

  await queryInterface.addColumn("blogs", "user_id", {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {model: "users", key: "id"}
  })


}
async function down({context: queryInterface}) {
  await queryInterface.dropTable("blogs")
  await queryInterface.dropTable("users")
}

module.exports = {
  up, down
}