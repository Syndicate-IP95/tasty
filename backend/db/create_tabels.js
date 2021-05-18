'use strict';

const tables = require('./tables.js');

const pool = require('./database.js');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
process.on('unhandledRejection', () => {
  pool.end();
});

(async () => { // creates all tables
  for (const table in tables) {
    const query = createTableQuery(table, tables);
    const client = await pool.connect();
    try {
      await client.query(query);
      await client.release();
      console.log(`Table ${table} created`);
    } catch (e) {
      await client.release();
      console.log(e);
    }
  }
  pool.end();
})();

function createTableQuery(table, tables) { // creates query for table
  let query = `CREATE TABLE IF NOT EXISTS ${table} `;
  query += '(';
  for (const field in tables[table]) { // add field and data type
    query += ` ${field} ${tables[table][field]}`;
    if (field !== 'PRIMARY KEY') query += ',';
  }
  query += ')';
  return query;
}