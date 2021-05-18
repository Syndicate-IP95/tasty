require("dotenv").config();

const {Pool} = require("pg");

const connectionString = process.env.postgresql_url;

const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

module.exports = { pool };