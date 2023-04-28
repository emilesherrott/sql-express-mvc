const { Pool } = require('pg')

const db = new Pool({
    connectionString: process.env.DB_URI
})

console.log(`DB connection established`)

module.exports = db