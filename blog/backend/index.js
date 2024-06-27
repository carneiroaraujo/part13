require("express-async-errors")

const express = require("express")
const app = express()

app.use(express.json())
app.use("/api/blogs", require("./controllers/blogs"))
app.use("/api/users", require("./controllers/users"))
app.use("/api/login", require("./controllers/login"))
app.use("/api/authors", require("./controllers/authors"))

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
			return response.status(400).send({error: error.errors.map(err => err.message)})

	}
	next(error)
	
}

app.use(errorHandler)

start()

