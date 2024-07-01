const jwt = require("jsonwebtoken")
const { SECRET } = require("../../../hello-world/util/config")


function tokenExtractor(req, res, next) {
	const auth = req.get("authorization")
	if (auth && auth.toLowerCase().startsWith("bearer ")) {
		try {
			req.decodedToken = jwt.verify(auth.substring(7), SECRET)
		} catch (error) {
			return res.status(401).json({error: "token invalid"})
		}
	} else {
		return res.status(401).json({error: "token missing"})
	}
	next()
}

module.exports = {tokenExtractor}