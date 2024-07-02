const jwt = require("jsonwebtoken")
const { SECRET } = require("../../../hello-world/util/config")
const { Session } = require("../models")


async function tokenExtractor(req, res, next) {
	const auth = req.get("authorization")

	if (!(auth && auth.toLowerCase().startsWith("bearer "))) {
		return res.status(401).json({error: "token missing"})
	} 

	const token = auth.substring(7)

	try {
		req.decodedToken = jwt.verify(token, SECRET)
	} catch (error) {
		return res.status(401).json({error: "token invalid"})
	}

	const session = await Session.findByPk(token)
	if (!session) {
		return res.status(401).json({error: "token expired"})
	}
	
	next()
}

module.exports = {tokenExtractor}