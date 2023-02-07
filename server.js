const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const colors = require('colors')
const cors = require('cors')
const cookieSession = require('cookie-session')
const passport = require('passport')
const connectDB = require('./config/db')
const { errorHandler, NotFound } = require('./middleware/error')
const passportSetup = require('./passport')
const bodyParser = require('body-parser')
const path = require('path');

connectDB()

app.use(errorHandler)
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieSession({
	name: "session",
	keys: ["pro"],
	maxAge: 24 * 60 * 60 * 100
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
	origin: process.env.CORS_ORIGIN,
	methods: "GET,POST,PUT,DELETE",
	credentials: true
}))

app.use('/api/products', require('./routes/products'))
app.use('/api/categories', require('./routes/category'))
app.use('/api/auth', require('./routes/auth'))
app.use('/auth', require('./routes/socialAuth'))
app.use('/api/user', require('./routes/user'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/stripe', require('./routes/stripe'))
app.use('/api/razorpayment', require('./routes/razorpay'))

// app.use(express.static(path.join(__dirname, "./client/build")));

// app.get('*', (_, res) => {
//   res.sendFile(path.join(__dirname, './client/build/index.html'));
// });

app.listen(process.env.PORT || 5000, ()=>{
	console.log(`app conneced`.brightCyan)
})
