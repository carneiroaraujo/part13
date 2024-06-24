require("express-async-errors")

const express = require("express")
const app = express()

app.use(express.json())
app.use("/api/blogs", require("./controllers/blogs"))

const {PORT} = require("./util/config")
const { ConnectToDatabase } = require("./util/db")

async function start() {
	await ConnectToDatabase()
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`)
	})
}

function errorHandler(error, request ,response, next) {
	switch (error.name) {
		case "SequelizeValidationError":
			response.status(400).end()
		default:
			next(error)
	}
	
}

app.use(errorHandler)

start()

