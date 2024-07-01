const router = require("express").Router()

const {UserBlogs} = require("../models")
const { tokenExtractor } = require("../util/middleware")

router.post("/", tokenExtractor, async (req, res) => {
  const {blogId, userId} = req.body
  res.json(await UserBlogs.create({
    blogId, userId
  }))
})

router.put("/:id", tokenExtractor, async (req, res) => {
  const {read} = req.body
  const userBlogs = await UserBlogs.findByPk(req.params.id)
  if (userBlogs.userId !== req.decodedToken.id) {
    return res.status(401).json({error: "operation not allowed"})
  }
  if (userBlogs) {
    userBlogs.read = read
    res.json(userBlogs)
  } else {
    res.status(404)
  }
  
})


module.exports = router