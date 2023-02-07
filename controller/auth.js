const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/users')
const asyncHandler = require('express-async-handler')

// user register
const register = asyncHandler(async(req, res)=>{
	const { name, email, password } = req.body

	if(!email || !name || !password){
		res.status(500).json('please fill all fields')
	}

	const existUser = await User.findOne({email})

	if(existUser){
		res.json('user already exist')
	}

	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)

	const user = await User.create({ name, email, password: hashedPassword })

	if(user){
		res.status(200).json(user)		
	}else{
		res.status(500).json('something went wrong')
	}
})

// login route
const login = asyncHandler(async(req, res)=>{
	const { email, password } = req.body

	const user = await User.findOne({email})

	if(!user){
		res.send(404)
		throw new Error('no user found')
	}

	const accessToken = await jwt.sign({id: user._id}, process.env.SECRET_KEY,
		{expiresIn: "5d"}
	)

	if(user && (await bcrypt.compare(password, user.password))){
		const { password, ...others } = user._doc
		res.status(200).json({...others, accessToken})
	} else {
    	res.status(400)
    	throw new Error('Invalid credentials')
  	}
})

module.exports = { register, login }