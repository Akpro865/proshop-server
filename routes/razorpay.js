const router = require('express').Router()
const Razorpay = require('razorpay')
const crypto = require('crypto')
const Order = require('../models/orders')

router.post('/orders', async (req, res)=>{
  const { id } = req.body
  const order = await Order.findById(id)
  const totalAmount = order.totalPrice
  try{
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const options = {
      amount: totalAmount * 100,
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex')
    }

    instance.orders.create(options, (error, order)=>{
      if(error){
        console.log(error)
        return res.status(500).json('something went wrong')
      }

      res.status(200).json(order)
    })
  }catch(err){
    console.log(err)
    res.status(500).json('server error')
  }
})

// verify payment
router.post('/verify', async (req, res)=>{
  try{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
    const sign = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                           .update(sign.toString()).digest("hex")

    if(razorpay_signature === expectedSign){
      return res.status(200).json('Payment verified successful')
    }else{
      return res.status(400).json('Invalid signature sent')
    }
  }catch(err){
    console.log(err)
    res.status(500).json('server error')
  }
})

module.exports = router