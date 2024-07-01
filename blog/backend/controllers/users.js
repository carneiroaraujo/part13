const router = require("express").Router()
const {Op} = require("sequelize")
const {User, Blog} = require("../models")

router.post("/", async (req, res) => {
  
  res.json(await User.create(req.body))
 
 
})

router.get("/:id", async (req, res) => {
  res.json(await User.findByPk(req.params.id))
})

router.get("/", async (req, res) => {
  // const read
  const read = req.query.read ? req.query.read === "true" : {[Op.in]: [true, false]}

  res.json(await User.findAll({
    include: [
      {
        model: Blog,
        as: "readings",
        through: {
          attributes: ["read", "id"],
          where: {
            read
          }
        },
        
        
      }
    ]
  }))
})

router.put("/:username", async (req, res) => {
  const newUsername = req.body.username
  const user = await User.findOne({
    where: {  
      username: req.params.username
    }
  })
  if (!user) return res.status(404).end()
  if (!newUsername) return res.status(400).end()

  
  user.username = req.pa
    res.json(user)
  
})

module.exports = router