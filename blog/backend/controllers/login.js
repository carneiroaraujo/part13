const jwt = require("jsonwebtoken")

const router = require("express").Router()

const {User} = require("../models")
const { SECRET } = require("../../../hello-world/util/config")

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
  res
  .status(200)
  .send({token, username: user.name, name: user.name})
  
})

module.exports = router