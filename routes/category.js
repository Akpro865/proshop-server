const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const Category = require('../models/category')

router.get('/', asyncHandler(async (req, res)=>{
	const categories = await Category.find()

	res.status(200).json(categories)
}))

module.exports = router