const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { register, login } = require('../controller/auth')

router.post('/register', register)
router.post('/login', login)

module.exports = router