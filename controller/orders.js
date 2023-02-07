const asyncHandler = require('express-async-handler')
const Order = require('../models/orders')

// create order
const placeOrder = asyncHandler(async(req, res)=>{
	try{
		const {user, orderItems, shippingAddress, paymentMethod,
		 paymentResult, taxPrice, shippingPrice, totalPrice, 
		 isPaid, paidAt, isDelivered, deliveredAt } = req.body

		 const details = {user, orderItems, shippingAddress, paymentMethod,
		 paymentResult, taxPrice, shippingPrice, totalPrice, 
		 isPaid, paidAt, isDelivered, deliveredAt}

		 const order = await Order.create(details)

		 res.status(201).json(order)
	} catch(err){
		console.log(err.message)
		res.json('please fill all fields')
	}
})

// get order
const getOrder = asyncHandler(async(req, res)=>{
	try{
		const order = await Order.findById(req.params.id).populate(
		 "user",
		 "name email"
		)
		if(order){
		 res.status(201).json(order)
		}
	} catch(err){
		console.log(err.message)
		res.status(404).json('no orders found')
	}
})

// get orders
const getOrders = asyncHandler(async(req, res)=>{
	try{
		const orders = await Order.find({user: req.user._id})		
		 res.status(200).json(orders)		
	} catch(err){
		res.status(404).json('no orders found')
	}
})

// get all orders - admin
const getAllOrders = asyncHandler(async(req, res)=>{	
		try{
			const orders = await Order.find({ }).populate("user", "id name")
			 res.status(200).json(orders)		
		} catch(err){
			console.log('jd 2',err)
			res.status(403).json('something went wrong.')
		}
})

// create order
const SuccessPay = asyncHandler(async(req, res)=>{
	try{
		const order = await Order.findById(req.params.id)
		console.log(order)
		if(order){
			order.isPaid = true
			order.paidAt = Date.now()
		}

		const updatedOrder = await order.save()
		console.log(updatedOrder)
		res.status(201).json(updatedOrder)
	} catch(err){
		console.log(err.message)
		res.json('no orders found')
	}
})

// mark as delivered
const SetDeilivered = asyncHandler(async(req, res)=>{
	try{
		const order = await Order.findById(req.params.id)
		console.log(order)
		if(order){
			order.isDelivered = true
			order.deliveredAt = Date.now()
		}

		const deliveredOrder = await order.save()
		console.log(updatedOrder)
		res.status(201).json(deliveredOrder)
	} catch(err){
		console.log(err.message)
		res.json('no orders found')
	}
})

module.exports = { placeOrder, getOrder, getOrders, SuccessPay, getAllOrders, SetDeilivered }