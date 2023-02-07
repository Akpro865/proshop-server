const asyncHandler = require('express-async-handler')
const Product = require('../models/products')

// get all products
const getProducts = asyncHandler(async (req, res)=>{
	const products = await Product.find()

	res.status(200).json(products)
})

// update product
const updateProduct = asyncHandler(async (req, res)=>{
	const { name, desc, brand, category, price, InStock, img } = req.body;
	try{	
		const product = await Product.findById(req.params.id)

		if(product){
			product.name = name || product.name, 
			product.desc = desc || product.desc, 
			product.brand = brand || product.brand,
			product.category = category || product.category, 
			product.price = price || product.price, 
			product.InStock = InStock || product.InStock, 
			product.img = img || product.img	
		}

		const updatedProduct = await product.save()		

		res.status(200).json(updatedProduct)
	}catch(err){
		console.log(err)
		res.status(404).json('no product found')
	}
})

// create product
const createProduct = asyncHandler(async (req, res)=>{
	console.log(req.user)
	const { name, desc, brand, category, price, InStock, img } = req.body
	console.log(name, desc, brand, category, price, InStock, img)
	try{				
		const createdProduct = await Product.create({user: req.user._id, name, desc, brand, category, price, InStock, img})

		if(createdProduct){
			res.status(200).json(createdProduct)
		}else{
			res.status(404).json('no product found')
		}		
    }catch(err){
    	console.log(err.message)
		res.status(401).json('jd is only allowed to add new product')
	}
})

// delete product
const deleteProduct = asyncHandler(async (req, res)=>{
	const { id } = req.body;
	if(req.user.isAdmin){		
		await Product.findByIdAndRemove(id)

		res.status(200).json('product deleted successfully.')
	}else{
		res.status(401).json('admin is only allowded to delete product.')
	}
})

// get single product
const getProduct = asyncHandler(async (req, res)=>{
	const product = await Product.findById(req.params.id)

	res.status(200).json(product)
})

// review product
const reviewProduct = asyncHandler(async (req, res)=>{
	const { rating, comment } = req.body   
	const product = await Product.findById(req.params.id)

	if(product){
		const existReview = product.reviews.find(r => r.user.toString() === req.user._id.toString())

		if(existReview) {
			res.status(400).json('product already reviewed')
		} else {
			const review = {
				name: req.user.name,
				rating,
				comment,
				user: req.user._id
			}

			product.reviews.push(review)
			product.numReviews = product.reviews.length
			product.rating = product.reviews.reduce((acc, item)=> item.rating + acc, 0) / product.reviews.length

			await product.save()

			res.status(201).json('review added successfully!')
		}
	} else{
  		res.status(500).json('no product found')
  	}
})

module.exports = { getProducts, getProduct, reviewProduct,
 updateProduct, createProduct, deleteProduct }