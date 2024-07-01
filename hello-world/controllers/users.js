const router = require("express").Router()

const { User, Note, Team } = require("../models")

const {tokenExtractor} = require("../middleware")

const {Op} = require("sequelize")

async function isAdmin(req, res, next) {
  const user = await User.findByPk(req.decodedToken.id)
  if (!user.admin) {
    return res.status(401).json({error: "operation not allowed"})
  }
  next()
}

router.get("/", async (req, res) => {
  await User.findOne({
    
  })
  res.json(await User.findAll({
    include: [
      {
        model: Note,
        attributes: {exclude: ["userId"]}
      },
      {
        model: Team,
        attributes: ["name", "id"],
        through: {
          attributes: []
        }
      }
    ]
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

router.put("/:username", tokenExtractor, isAdmin, async (req, res) => {
  const user = User.findOne({
    where: {
      username: req.params.username
    }
  })

  if (user) {
    user.disabled = req.body.disabled
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})


module.exports = router