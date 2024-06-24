const router = require("express").Router()
const Blog = require("../models/blog")
async function blogFinder(req, res, next) {
	const blog = await Blog.findByPk(req.params.id)
	if (blog) req.blog = blog
	else return res.status(404).end()
	next()
}
router.get("/", async (req, res) => {
	res.json(await Blog.findAll())
})
router.post("/", async (req, res) => {
	// try {
		const blog = await Blog.create(req.body)
		res.json(blog)
	// } catch (error) {
	// 	res.status(400).json({error})
	// }

})
router.delete("/:id", blogFinder, async (req, res) => {
	const blog = req.blog
	if (blog) {
		await req.blog.destroy()
	}
	res.status(204).end()
})
router.put("/:id", blogFinder, async (req, res) => {
	const blog = req.blog
	blog.likes = req.body.likes
	await blog.save()
	res.json(blog)
	
})

module.exports = router