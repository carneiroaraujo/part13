
const router = require("express").Router()

const Note = require("../models/note")

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
	const notes = await Note.findAll()
	res.json(notes)
})

router.post("/", async (req, res) => {
	console.log(req.body)
	try {	
		const note = await Note.create(req.body)
		res.json(note)
	} catch (error) {
		return res.status(400).json({error})
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