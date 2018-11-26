const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool();

pool.on('error', (err, client) => {
  console.error('Error on idle client', err);
  process.exit(-1);
});


module.exports = {
  query: (text, values) =>
    pool
      .query(text, values)
      .then(res => res)
      .catch(e => console.error(e)),
  getClient: () => pool.connect(),
  drain: () => pool.end(),
};
