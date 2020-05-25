const AccessControl = require('accesscontrol')
const access = new AccessControl()

exports.roles = (function() {
    access.grant('User')
        .readAny('Ticket')
        .updateAny('Ticket')
        
    access.grant('Admin')
        .readAny('Ticket')
        .updateAny('Ticket')
        .createAny('Ticket')
    
    return access
})()