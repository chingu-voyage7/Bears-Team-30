const { Pool } = require('pg');
require('dotenv').config();

console.log(process.env.PGUSER);

const pool = new Pool();

pool.on('error', (err, client) => {
  console.error('Error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, values) =>
    pool.query(text, values).catch(e => {
      console.error('DB error:', e);
      throw e;
    }),
  getClient: () => pool.connect(),
  drain: () => pool.end(),
};
