const bcrypt = require('bcryptjs')

const users = [
	{
		name: 'Admin',
		email: 'admin@gmail.com',
		password: bcrypt.hashSync('pro7', 10),
		isAdmin: true
	},
	{
		name: 'pro',
		email: 'pro@gmail.com',
		password: bcrypt.hashSync('pro7', 10)
	},
	{
		name: 'master',
		email: 'master@gmail.com',
		password: bcrypt.hashSync('pro7', 10),
	},
]

module.exports = { users }