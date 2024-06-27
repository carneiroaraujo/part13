const router = require("express").Router()
const {Blog} = require("../models")
const { sequelize } = require("../util/db")

router.get("/", async (req, res) => {
  res.json(await Blog.findAll({
    attributes: [
      [sequelize.fn("COUNT", sequelize.col("title")), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
      "author"
    ],
    group: "author",
    order: [["likes", "desc"]]
  }))
})


module.exports = router