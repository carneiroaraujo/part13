const router = require("express").Router()
const {Blog, User} = require("../models")
const { Op } = require("sequelize")
const {tokenExtractor} = require("../util/middleware")
async function blogFinder(req, res, next) {
	const blog = await Blog.findByPk(req.params.id)
	if (blog) req.blog = blog
	else return res.status(404).end()
	next()
}

router.get("/", async (req, res) => {
	const {search} = req.query
	let where = {}
	if (search) {
		where = {...where, [Op.or]: {
			title: {
				[Op.substring]: search
			},
			author: {
				[Op.substring]: search
			},
		}}
	}
	res.json(await Blog.findAll({
		attributes: {
			exclude: ["userId"]
		},
		include: {
			model: User,
			attributes: ["name"]
		},
		where,
		order: [["likes", "desc"]]
	}))
})

router.post("/", tokenExtractor, async (req, res) => {
	const user = await User.findByPk(req.decodedToken.id)
	const blog = await Blog.create({...req.body, userId: user.id})
	res.json(blog)
})

router.delete("/:id", tokenExtractor, blogFinder, async (req, res) => {
	const user = await User.findByPk(req.decodedToken.id)
	const blog = req.blog
	if (blog.userId !== user.id) {
		return res.status(401).send({error: "user is not the owner"})
	} 
	await blog.destroy()
	res.status(204).end()
})

router.put("/:id", blogFinder, async (req, res) => {
	const blog = req.blog
	blog.likes = req.body.likes
	await blog.save()
	res.json(blog)
	
})

module.exports = router