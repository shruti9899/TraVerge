const mongoose = require('mongoose')

//User Schema
const UserSchema = mongoose.Schema({
   username: {
       type: String,
       required: true
   },
   password: {
       type: String,
       required: true
   },
   role: {
       type: String,
       required: true,
       default: "User",
       enum: ["User","Admin"]
   }
}, { timestamps: true})

module.exports = mongoose.model('User',UserSchema) 