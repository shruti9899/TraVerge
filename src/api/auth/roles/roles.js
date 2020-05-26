const AccessControl = require('accesscontrol')
const access = new AccessControl()

/*
    There are two roles currently:

    1)User
        It have following permissions granted:
            - Read any tickets data
            - Update any ticket ( for booking )

    2)Admin
        It have following permissions granted:
            -Read any tickets data
            -Update any tickets
            -reset all tickets

*/
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