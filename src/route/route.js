const express = require('express')
const guard = require('express-jwt')
const env = require('../config/environment')

//importing api routes
const ticketRoutes = require('../api/ticket/ticket.route')
const authRoutes = require('../api/auth/user/user.route')

const router = express.Router()

router.get('/',(req,res) => res.send('Welcome'))
router.use('/auth',authRoutes)

//route guard middleware fro authenticating tickets apis
router.use(guard({ secret: env.jwtSecret, requestProperty: 'auth'}))
router.use('/tickets',ticketRoutes)

module.exports = router