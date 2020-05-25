const bcrypt = require('bcryptjs')
const httpStatus = require('http-status')

const JWToken = require('../../../libs/jwToken')
const APIError = require('../../../libs/APIError')

//importing user model
const User = require('./user.model')

//signup function
async function signUp (req, res, next) {
    try{
        const user = await User.findOne({username: req.body.username, role: req.body.role})
        if(user){
            throw new APIError("User already exists",httpStatus.NOT_ACCEPTABLE)
        }
        else{
            const user = new User({
                username: req.body.username,
                password: req.body.password,
                role: req.body.role
            })
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync())
            await user.save()
            return res.json({message: "User Registered Sucessfully"})
        }
    } catch(err){
        next(err)
    }
}

//login function
async function login (req, res, next) {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const payload = {
        _id: user._id,
        username: user.username,
        role: user.role
      }
      const token = JWToken.create(payload, '20m')
      return res.json({
        token,
        user: {
          _id: user._id,
          username: user.username,
        }
      })
    }
    throw new APIError('Authentication error!', httpStatus.UNAUTHORIZED, true)
  } catch (err) {
    next(err)
  }
}


module.exports = {
    signUp,
    login
}