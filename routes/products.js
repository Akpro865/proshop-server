const router = require('express').Router()
const { getProducts, getProduct, reviewProduct, 
	    createProduct, updateProduct, deleteProduct } = require('../controller/products')
const { verify } = require('../middleware/authMiddleware')

router.get('/', getProducts)
router.get('/:id', getProduct)
router.post('/:id/review', verify, reviewProduct)
router.put('/:id/edit', verify, updateProduct)
router.post('/new', verify, createProduct)
router.delete('/', verify, deleteProduct)

module.exports = router