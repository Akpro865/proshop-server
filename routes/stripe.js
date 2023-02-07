const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

router.post('/create-checkout-session', async (req, res) => {	
	const line_items = req.body.orderItems.map(item =>{
		return {
		  price_data: {
			currency: 'inr',
			product_data: {
				name: item.name,
				images: [item.img],
				description: item.desc,
				meta_data: { id: item.id },
			},
			unit_amount: item.price * 100
		},
		quantity: item.qty
	}
	})

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/orders/success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  })

  res.send({url: session.url})
});

module.exports = router