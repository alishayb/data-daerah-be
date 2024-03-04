const { Pool, types } = require("pg");

types.setTypeParser(types.builtins.NUMERIC, (value) => parseFloat(value));

const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DB,
  password: process.env.PSQL_PASSWORD,
  port: process.env.PSQL_PORT,
});

module.exports = pool;
