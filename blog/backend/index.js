require("dotenv").config()

const {Sequelize} = require("sequelize")
const sequelize = new Sequelize(process.env.DATABASE_URL)

const express = require("express")
const app = express()



const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
