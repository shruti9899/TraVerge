const mongoose = require('mongoose')

//Passenger schema
const PassengerSchema = mongoose.Schema({
    passengerName: {
        type: String,
        required: true
    },
    passengerAge: {
        type: Number,
        required: true
    },
    passengerGender: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Passenger',PassengerSchema)