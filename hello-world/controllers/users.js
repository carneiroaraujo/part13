const router = require("express").Router()

const { User, Note } = require("../models")

router.get("/", async (req, res) => {
  res.json(await User.findAll({
    include: {
      model: Note
    }
  }))
})

router.post("/", async (req, res) => {
  try {
    res.json(await User.create(req.body))
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.get("/:id", async (req, res) => {
  const user = User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router