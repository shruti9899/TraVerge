const httpStatus = require('http-status')

const APIError = require('../../libs/APIError')
//importing models
const TicketSchema = require('./ticket.model')
const PassengerSchema = require('../passenger/passenger.model')

//View ticket status by Ticket Id
async function viewStatusById (req, res, next){
    try{
        const ticket = await TicketSchema.get({ '_id': req.params.ticketId})
        return res.json({ status: ticket.isBooked})
    } catch(err) {
        next(err)
    }
}

//View All tickets based on boolean status
async function viewTicketsByStatus (req, res, next){
    try{
        const status = req.params.status
        const tickets = await TicketSchema.find({ isBooked: status})
        return res.json(tickets)
    } catch(err){
        next(err)
    }
}

//View passenger information based on TIcket Id
async function viewPassengerDetails (req, res, next){
    try{
        const ticket = await TicketSchema.get({_id: req.params.ticketId})
        if(ticket.passenger){
        const passenger = await PassengerSchema.findById(ticket.passenger)
        return res.json(passenger)
        }
        else{
            throw new APIError("Ticket is not booked yet!",httpStatus.NOT_FOUND)
        }
    } catch(err){
        next(err)
    }
}

//Update the ticket + adding user details on booking
async function updateTicket (req, res, next){
    try{
        const ticket = await TicketSchema.get({ _id: req.params.ticketId})
        //if ticket is not booked then create passenger based on details provided
        if(ticket.isBooked == false) {
            const Passenger = new PassengerSchema({
            passengerName: req.body.name,
            passengerAge: req.body.age,
            passengerGender: req.body.gender
            })
            const savedPassenger = await Passenger.save()
            ticket.isBooked = true
            ticket.passenger = savedPassenger._id
        } 
        else { //if booked then update the passenger details based on details provided
            const passenger = await PassengerSchema.findOne({_id: ticket.passenger})
            passenger.passengerName = req.body.name
            passenger.passengerAge = req.body.age
            passenger.passengerGender = req.body.gender
            passenger.save()
        }
        const savedTicket = await ticket.save()
        return res.json(savedTicket)
    } catch(err){
        next(err)
    }
}

//Reset all tickets to non booked and deleting respected passengers (only accessible to admins)
async function resetAll (req, res, next){
    try{
        const tickets = await TicketSchema.find({})
        await tickets.forEach(closeTickets)
        res.json({message:"All tickets are reset!"})
    } catch(err){
        next(err)
    }
}

//to close ticket
async function closeTickets (ticket){
    try{
        await PassengerSchema.deleteOne({_id: ticket.passenger})
        ticket.isBooked = false
        ticket.passenger = null
        await ticket.save()
    } catch(err){
        next(err)
    }
}

module.exports = {
    viewStatusById,
    viewTicketsByStatus,
    updateTicket,
    viewPassengerDetails,
    resetAll
}
