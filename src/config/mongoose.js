const mongoose = require('mongoose')
const util = require('util')
const debug = require('debug')('Traverge-node-starter:index')
Promise = require('bluebird')
mongoose.Promise = require('bluebird')

const env = require('./environment')
const Ticket = require('../api/ticket/ticket.model')

//mongo parameters set
const mongoOption = {
  useCreateIndex: true,
  keepAlive: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}

const mongoUri = env.mongo.host

//mongoDB connection
mongoose.connect(mongoUri, mongoOption)
//on successful connection
mongoose.connection.on('connected',() => {
  //Creating 40 tickets for static purpose on DB creation
  Ticket.find().exec((err,result) => {
    if(err){
      throw new this.Error('Ticket Model Not Found!')
    }
    else{
      if(result.length == 0){
        for (let index = 0; index < 40; index++) {
            const ticket = new Ticket({ seatNo: (index+1) })
            ticket.save()    
        }
      }
    }
  })
})
//on failed connection 
mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to database: ${mongoUri}`)
})
//for debug
if (env.mongo.debug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc)
  })
}

module.exports = mongoose