const router = require('express').Router()
const passport = require('passport')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

const CLIENT_URI = 'http://localhost:3000'

router.get('/login/failed', (req, res)=>{
	res.status(401).json({ message: "login failed"})
})

router.get('/login/success', async(req, res)=>{
	const user = await User.findOne(req.user.emails[0])

    if(user) {
      const accessToken = await jwt.sign({id: user._id}, process.env.SECRET_KEY,
      {expiresIn: "5d"})

      res.status(200).json({...req.user, accessToken})
    }else{
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.user.id, salt)

      const newUser = await User.create({ name: req.user.name, email: req.user.emails[0], password: hashedPassword })

      const accessToken = await jwt.sign({id: newUser._id}, process.env.SECRET_KEY,
      {expiresIn: "5d"})
      
      res.status(200).json({...newUser, accessToken})
    }
})

router.get('/logout', (req, res)=>{
	req.logout()
	res.redirect(CLIENT_URI)
})

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', {
	successRedirect: CLIENT_URI,
  failureRedirect: "/login/failed",	
}))

router.get('/github',
  passport.authenticate('github', { scope: [ 'profile' ] }));

router.get('/github/callback', 
  passport.authenticate('github',{
	successRedirect: CLIENT_URI,
  failureRedirect: "/login/failed",	
}));

module.exports = router