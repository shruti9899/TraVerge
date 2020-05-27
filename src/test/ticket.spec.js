var assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
const user = require('../api/auth/user/user.model')
require('./auth.spec')


let server = require('../index');

let should = chai.should();
chai.use(chaiHttp);

var AdminToken
var UserToken

var testAdmin = {
    "username": "shrutishah.20199",
    "password": "password",
    "role": "Admin"
}
var testUser = {
    "username": "TempUser",
    "password": "tempPassword",
    "role": "User"
}

var passenger = {
    "name": "Thomas",
    "age": 21,
    "gender": "Male"
}
var ticketId;

describe("Ticket operations", () => {

    
    it("should test login for user", (done) => {
        chai.request(server)
        .post('/api/auth/login')
        .send(testUser)
        .end((err, result) => {
            result.should.have.status(200)
            UserToken = result.body.token
            console.log(UserToken)
            console.log("Test USer login successful")
            
            done()
        })
    })
    
    it("should test login for admin", (done) => {
        chai.request(server)
        .post('/api/auth/login')
        .send(testAdmin)
        .end((err, result) => {
            result.should.have.status(200)
            AdminToken = result.body.token
            console.log(AdminToken)
            console.log("Test Admin login successful")
            
            done()    
        })
    })
    
    it("should get all the open tickets", (done) => {
        chai.request(server)
        .get('/api/tickets/status/false')
        .set('Authorization',`Bearer ${UserToken}`)
        .end((err,result) => {
            result.should.have.status(200)
            ticketId = result.body[0]._id
            console.log(ticketId);
            
            console.log("Got", result.body.length, " docs")
            
            done()
        })
    })

    it("should not get all the open tickets because of unauthorized", (done) => {
        chai.request(server)
        .get('/api/tickets/status/false')
        .end((err,result) => {
            result.should.have.status(401)
            
            console.log("Got no result")
            
            done()
        })
    })
    
    it("should get all the closed tickets", (done) => {
        chai.request(server)
        .get('/api/tickets/status/true')
        .set('Authorization',`Bearer ${UserToken}`)
        .end((err,result) => {
            result.should.have.status(200)
            console.log("Got", result.body.length, " docs")
            
            done()
        })
    })

    it("should not get all the closed tickets becuase of no authorization", (done) => {
        chai.request(server)
        .get('/api/tickets/status/true')
        .end((err,result) => {
            result.should.have.status(401)
            console.log("Got error of unauthority")
            
            done()
        })
    })
    
    it("should update the ticket", (done) => {
        
        chai.request(server)
        .put('/api/tickets/update/'+ticketId)
        .send(passenger)
        .set('Authorization',`Bearer ${UserToken}`)
        .end((err, result) => {
            result.should.have.status(200)
            
            console.log("Updated ticket ", result.body)
            
            done()
        })
    })
    
    it("should not update the ticket because of unauthority", (done) => {
        
        chai.request(server)
        .put('/api/tickets/update/'+ticketId)
        .send(passenger)
        .end((err, result) => {
            result.should.have.status(401)
            
            console.log("Unable to update because of unauthority")
            
            done()
        })
    })

    it("should get passenger details of ticket", (done) => {
        chai.request(server)
            .get('/api/tickets/passenger/'+ticketId)
            .set('Authorization',`Bearer ${UserToken}`)
            .end((err, result) => {
                result.should.have.status(200)
                result.body.passengerName.should.eq(passenger.name)
                result.body.passengerAge.should.eq(passenger.age)
                result.body.passengerGender.should.eq(passenger.gender)
                console.log("Got the Passenger details")

                done()
            })
    })

    it("should not get passenger details of ticket because of unauthority", (done) => {
        chai.request(server)
            .get('/api/tickets/passenger/'+ticketId)
            .end((err, result) => {
                result.should.have.status(401)

                console.log("could not got the Passenger details as of unauthorized")

                done()
            })
    })

    it("should reset all tickets", (done) => {
        chai.request(server)
            .post('/api/tickets/reset')
            .set('Authorization',`Bearer ${AdminToken}`)
            .end((err, result) => {
                result.should.have.status(200)
                console.log(result.body)
              
                done()
            })
    })

    it("should not reset all tickets", (done) => {
        chai.request(server)
            .post('/api/tickets/reset')
            .set('Authorization',`Bearer ${UserToken}`)
            .end((err, result) => {
                result.should.have.status(500)
                console.log("Could not reset because of unauthorization")
              
                done()
            })
    })

    after((done) => {
        user.deleteMany({username: { $in :["TempUser","shrutishah.20199"]}})
        .then(() => {
            console.log("Users deleted successfully")
            
            done()})
    })
})