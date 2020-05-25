const joi = require('joi')

module.exports = {
    viewStatusById: {
        headers: {
            authorization: joi.string().required()
        }
    },

    viewTicketsByStatus: {
        headers: joi.object({
            authorization: joi.string().required()
        })
    },

    updateTicket: {
        headers: joi.object({
            authorization: joi.string().required()
        }),
        body: joi.object({
            name: joi.string().required(),
            age: joi.number().required(),
            gender: joi.string().required()
        })
    },

    viewPassengerDetails: {
        headers: joi.object({
            authorization: joi.string().required()
        })
    },

    resetAll: {
        headers: joi.object({
            authorization: joi.string().required()
        })
    }
}