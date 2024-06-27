const router = require("express").Router()

const {User, Blog} = require("../models")

router.post("/", async (req, res) => {
  
  res.json(await User.create(req.body))
 
 
})

router.get("/", async (req, res) => {
  res.json(await User.findAll({
    include: {
      model: Blog
    }
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