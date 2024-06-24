require("dotenv").config()

const {Sequelize, Model, DataTypes} = require("sequelize")
const sequelize = new Sequelize(process.env.DATABASE_URL)

const express = require("express")
const app = express()
app.use(express.json())
class Blog extends Model {}
Blog.init({
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
		allowNull: false,
	},
	title: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	likes: {
		type: DataTypes.INTEGER
	},
}, {
	sequelize,
	underscored: true,
	timestamps: false,
	modelName: "blog"
})
Blog.sync()


app.get("/api/blogs", async (req, res) => {
	res.json(await Blog.findAll())
})

app.post("/api/blogs", async (req, res) => {
	try {
		const blog = await Blog.create(req.body)
		res.json(blog)
	} catch (error) {
		res.status(400).json({error})
	}

})

app.delete("/api/blogs/:id", async (req, res) => {
	try {
		await (await Blog.findByPk(req.params.id)).destroy()
		res.status(204).end()
	} catch (error) {
		res.status(400).json({error})
	}
	// try {
	// 	const blog = await Blog.create(req.body)
	// 	res.json(blog)
	// } catch (error) {
	// 	res.status(400).json({error})
	// }
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

