const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const User = require('./models/users')
const Product = require('./models/products')
const Category = require('./models/category')
const Order = require('./models/orders')
const connectDB = require('./config/db')
const { users } = require('./config/user')
const { products } = require('./config/products')
const { cats } = require('./config/products')

connectDB()

const importData = async ()=>{
	try{
		await User.deleteMany()
		await Product.deleteMany()
		await Order.deleteMany()
		await Category.deleteMany()

		await Category.insertMany(cats)
		const createdUser = await User.insertMany(users)
		const adminUser = createdUser[0]._id

		const sampleProducts = products.map((product) => {
      		return { ...product, user: adminUser }
    	})

    	await Product.insertMany(sampleProducts)

    	console.log('Data Imported!'.green.inverse)
    	process.exit()
	}catch(err){
		console.log(err)
		process.exit(1)
	}
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    await Category.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}