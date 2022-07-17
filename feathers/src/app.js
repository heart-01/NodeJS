const feathers = require('@feathersjs/feathers')
const express = require('@feathersjs/express')
const configuration = require('@feathersjs/configuration')
const socketio = require('@feathersjs/socketio')
const services = require('./services')

const cors = require('cors')
require('../configs/mongoose.db.js')
require('dotenv').config()

const PORT = process.env.PORT || 3030
const app = express(feathers())
const server = app.listen(PORT)

app.configure(configuration())
app.configure(express.rest()) // Add REST API support
app.configure(socketio()) // Configure Socket.io real-time APIs
app.use(express.urlencoded({extended: true})) // Parse URL-encoded params
app.use(express.json({ limit: '10mb' })) // Parse HTTP JSON bodies
app.use(cors())

// Set up our services feather (see `services/index.js`)
app.configure(services)

app.get('/', (req, res) => {
    res.send('Feathers service ...')
})

server.on('listening', () => {
    console.log(`Feathers application started on localhost [${PORT}]`)
})

module.exports = app