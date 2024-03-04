const { Pool, types } = require('pg')

types.setTypeParser(types.builtins.NUMERIC, (value) => parseFloat(value));

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "data_daerah",
    password: "supostgres",
    port: 5432
})

module.exports = pool