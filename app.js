const express = require('express')
const cors = require('cors')

const logger = require('./logger')
const pokemonRouter = require('./router/pokemon')

const app = express()

// Middleware
app.use(express.json())
app.use(cors())
app.use(logger)

// Routing
app.use('/pokemon', pokemonRouter)

module.exports = app