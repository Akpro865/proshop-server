const mongoose = require('mongoose')

const connectDB = async()=>{
	try{
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		})
		console.log(`mongodb connected`.brightCyan)
	}catch(err){
		console.log(`${err.message}`.brightRed)
		process.exit(1)
	}
}

module.exports = connectDB