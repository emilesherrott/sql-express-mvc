require('dotenv').config()

const fs = require('fs')
const db = require('./connect')

const pokemonSchema = fs.readFileSync('./database/pokemonSchema.sql').toString()
const pokemonSeed = fs.readFileSync('./database/pokemonSeed.sql').toString()

const setUp = async () => {
    await db.query(pokemonSchema)
    await db.query(pokemonSeed)
    console.log('Database Seeded')
}

setUp()
