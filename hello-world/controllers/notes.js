const jwt = require("jsonwebtoken")
const router = require("express").Router()

const {Note, User} = require("../models")
const { SECRET } = require("../util/config")

function tokenExtractor(req, res, next) {
	const authorization = req.get("authorization")
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		try {
			req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
		} catch {
			return res.status(401).json({ error: "token invalid" })
		}
	} else {
		return res.status(401).json({ error: "token missing" })
	}
	next()
}
async function noteFinder(req, res, next) {
	req.note = await Note.findByPk(req.params.id)
	next()
}

router.get("/:id", noteFinder, async (req, res) => {

	const note = req.note
	if (note) {
		res.json(note)
	} else {
		res.status(404).end()
	}
})

router.get("/", async (req, res) => {
	const notes = await Note.findAll({
		attributes: {exclude: ["userId"]},
		include: {
			model: User,
			attributes: ["name"]
		}
	})
	res.json(notes)
})

router.post("/", tokenExtractor, async (req, res) => {
	
	try {
		console.log(req.decodedToken);
		const user = await User.findByPk(req.decodedToken.id)
		const note = await Note.create({...req.body, userId: user.id, date: new Date()})
		res.json(note)
	} catch (error) {
		return res.status(400).json({ error })
	}
})

router.put("/:id", noteFinder, async (req, res) => {

	const note = req.note
	if (note) {
		note.important = req.body.important
		await note.save()
		res.json(note)
	} else {
		res.status(404).end()
	}
})

router.delete("/:id", async (req, res) => {

	const note = await Note.findByPk(req.params.id)
	if (note) {
		await note.destroy()

	}
	res.status(204).end()

})

module.exports = router