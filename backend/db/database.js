// 'use strict'

// require("dotenv").config();

// const { Pool } = require("pg");

// const isProduction = process.env.NODE_ENV === "production";

// const connectionString = process.env.connectionString;


// const pool = new Pool({
//   connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//   ssl: { rejectUnauthorized: false },
// });

// module.exports = { pool };

'use strict'

const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
  ssl: config.ssl,
});

module.exports = pool;