require("dotenv").config();

const {Pool} = require("pg");

const connectionString = `postgres://okutzwyhftrumx:1dd842b4b2210e8aa5e8dcf5117ffab9c443aa43c1d8f06fcb495b1df2860196@ec2-34-225-167-77.compute-1.amazonaws.com:5432/dcdjja6cncj19n`;

const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

module.exports = { pool };