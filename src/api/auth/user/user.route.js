const express = require('express')
const validate = require('express-validation')

const userParam = require('./user.param')
const userCtrl = require('./user.controller')

const router = express.Router()

//routes
router.post('/login', validate(userParam.login), userCtrl.login)
router.post('/signup', validate(userParam.signUp), userCtrl.signUp)

module.exports = router