const User = require('../models/users')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

// update user
const updateUser = asyncHandler(async(req, res)=>{
	if(req.user.id === req.params.id){
		if(req.body.password){
			const salt = await bcrypt.genSalt(10)
			req.body.password = await bcrypt.hash(req.body.password, salt)
		}
		try{
			const updatedUser = await User.findByIdAndUpdate(req.params.id,
				{ $set: req.body }, { new: true })

			res.status(200).json(updatedUser)
		} catch(err){
			res.status(500).json(err)			
		}
	} else {
		res.status(403).json('you can update only your account')
	}
})

// delete user
const deleteUser = async(req, res) => {
	if(req.user.id === req.params.id) {
		
		try {
			await User.findByIdAndRemove(req.params.id)

			res.status(200).json("User deleted successfully!")
		} catch (err) {
			res.status(500).json(err)
		}
	} else {
		res.status(403).json("you can delete only your account")
	}
}

// get user
const getUser = asyncHandler(async(req, res)=>{	
	try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json('no user found');
    }
	
})

// get all users
const getAllUsers = asyncHandler(async(req, res)=>{	
	try {
      const users = await User.find({})
      res.status(200).json(users)
    } catch (err) {
      res.status(500).json('something went wrong');
    }
	
})

module.exports = { updateUser, deleteUser, getUser, getAllUsers }