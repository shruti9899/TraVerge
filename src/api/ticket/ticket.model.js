const mongoose = require('mongoose')
const httpStatus = require('http-status')
const Promise = require('bluebird')
const APIError = require('../../libs/APIError')

//Ticket schema
const TicketSchema = new mongoose.Schema({
    seatNo: {
        type: Number,
        min: 1,
        max: 40,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    },  
    passenger: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Passenger',
        default: null
    },
},
    {timestamps: true})

TicketSchema.statics = {
    //static get method to fetch ticket based on condition
    async get (conditions) {
        const Ticket = await this.findOne(conditions).exec()
        if(Ticket){
            return Ticket
        }
        const err = new APIError('No such Ticket exists!',httpStatus.NOT_FOUND)
        return Promise.reject(err)
    },
}

module.exports = mongoose.model('Ticket', TicketSchema)