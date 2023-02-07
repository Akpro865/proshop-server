const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { placeOrder, getOrder, getOrders, SuccessPay, getAllOrders, SetDeilivered } = require('../controller/orders')
const { verify } = require('../middleware/authMiddleware')

router.route('/').post(verify, placeOrder).get(verify, getAllOrders)
router.route('/userorders').get(verify, getOrders)
router.route('/:id').get(verify, getOrder)
router.route('/:id/pay').put(SuccessPay)
router.route('/:id/delivered').put(SetDeilivered)

module.exports = router