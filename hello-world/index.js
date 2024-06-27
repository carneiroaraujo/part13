const express = require("express")
const app = express()

const {PORT} = require("./util/config")
const {connectToDatabase} = require("./util/db")

app.use(express.json())

app.use("/api/notes", require("./controllers/notes"))
app.use("/api/users", require("./controllers/users"))
app.use("/api/login", require("./controllers/login"))

async function start() {
	await connectToDatabase()
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`)
	})
}

start()

// require("dotenv").config()
// const express = require("express")
// const app = express()

// const sequelize = new Sequelize(process.env.DATABASE_URL)




// Note.sync()



// const PORT = process.env.PORT || 3001

// app.listen(PORT, () => {
// 	console.log(`Server running on port ${PORT}`)
// })
