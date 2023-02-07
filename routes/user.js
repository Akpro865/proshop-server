const router = require('express').Router()
const { getUser, updateUser, deleteUser, getAllUsers } = require('../controller/user')
const { verify } = require('../middleware/authMiddleware')

router.get('/', verify, getAllUsers)
router.route('/:id').get(getUser).put(verify, updateUser).delete(verify, deleteUser)

module.exports = router