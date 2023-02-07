const jwt = require('jsonwebtoken')
const User =require('../models/users')

const verify = async(req, res, next)=>{
	let token

	if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
		try {
			token = req.headers.authorization.split(" ")[1]

			const decoded = jwt.verify(token, process.env.SECRET_KEY)

			req.user = await User.findById(decoded.id)

			next()
		} catch(err){
			console.log(err)
			res.status(401).json("no token, not authorized")
		}
	}

	if(!token){
		console.log('no token')
		res.status(401).json("you are not authorized")
	}
}

module.exports = { verify }