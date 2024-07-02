const jwt = require("jsonwebtoken")

const router = require("express").Router()

const {User, Session} = require("../models")
const { SECRET } = require("../../../hello-world/util/config")
const { tokenExtractor } = require("../util/middleware")

router.post("/", async (req, res) => {
  const {username, password} = req.body

  const user = await User.findOne({
    where: {
      username
    }
  })

  const passwordCorrect = password === "secret"

  if (!(user && passwordCorrect)) {
    return res.status(401).json({error: "invalid username or password"})
  }
  const token = jwt.sign({id: user.id, username:user.id}, SECRET)
  await Session.create({token})
  res
  .status(200)
  .send({token, username: user.name, name: user.name})
  
})

router.post("/logout", tokenExtractor, async (req, res) => {
  const session = await Session.findByPk(req.get("authorization").substring(7))
  await session.destroy()
  res.status(204).end()
})

module.exports = router