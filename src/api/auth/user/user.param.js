const joi = require('joi')

module.exports = {
    signUp: {
        body: {
            username: joi.string().required(),
            password: joi.string().required(),
            role: joi.string().required()
        }
    },  
    login: {
        body: {
            username: joi.string().required(),
            password: joi.string().required()
        }
    }
}