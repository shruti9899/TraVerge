var assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
chai.use(chaiHttp);

const User = require('../api/auth/user/user.model')
var Admintoken;
var UserToken;



describe("Test Authentication", () => {

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

    it("should create new Admin", (done) => {
        chai.request(server)
        .post('/api/auth/signup')
        .send(testAdmin)
        .end((err, result) => {
            result.should.have.status(200)
            console.log("New Admin created")
            
            done()
        })
    })

    it("should test login for admin", (done) => {
        chai.request(server)
        .post('/api/auth/login')
        .send(testAdmin)
        .end((err, result) => {
            result.should.have.status(200)
            Admintoken = result.body.token
            console.log("Test Admin login successful")
            
            done()    
        })
    })

    it("should create new USer", (done) => {
        chai.request(server)
        .post('/api/auth/signup')
        .send(testUser)
        .end((err, result) => {
            result.should.have.status(200)
            console.log("New User created")
            
            done()
        })  
    })

    it("should test login for user", (done) => {
        chai.request(server)
        .post('/api/auth/login')
        .send(testUser)
        .end((err, result) => {
            result.should.have.status(200)
            UserToken = result.body.token
            console.log("Test USer login successful")

            done()
        })
    })
})


module.exports = {
    Admintoken,
    UserToken
}