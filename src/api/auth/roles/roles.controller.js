const {roles} = require('./roles')
const jwtoken = require('../../../libs/jwToken')
const APIError = require('../../../libs/APIError')

//grantAccess function for access grant as per role
function grantAccess (action, resource) {
    return async(req, res, next) => {
        try{
            const token = await req.headers['authorization'].split(' ')[1]
            const permission = roles.can(jwtoken.getData(token).role)[action](resource)
            if(!permission.granted){
                throw new APIError("You dont have permission to perform this action")
            }
            next()
        } catch(err){
            next(err)
        }  
    }
}

module.exports = {
    grantAccess
}