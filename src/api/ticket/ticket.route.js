const express = require('express')
const validate = require('express-validation')
//role based access
const access = require('../auth/roles/roles.controller')

const ticketCtrl = require('./ticket.controller')
const ticketParam = require('./ticket.param')

const router = express.Router()

//routes with role based grants and parameter validation middlewares
router.get('/status/:status',access.grantAccess('readAny','Ticket'),validate(ticketParam.viewTicketsByStatus),ticketCtrl.viewTicketsByStatus)
router.get('/:ticketId',access.grantAccess('readAny','Ticket'),validate(ticketParam.viewStatusById),ticketCtrl.viewStatusById)
router.get('/passenger/:ticketId',access.grantAccess('readAny','Ticket'),validate(ticketParam.viewPassengerDetails),ticketCtrl.viewPassengerDetails)

router.put('/update/:ticketId',access.grantAccess('updateAny','Ticket'),validate(ticketParam.updateTicket),ticketCtrl.updateTicket)

router.post('/reset',access.grantAccess('createAny','Ticket'),validate(ticketParam.resetAll),ticketCtrl.resetAll)

module.exports = router