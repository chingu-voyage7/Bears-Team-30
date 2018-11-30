const bcrypt = require('bcryptjs');
const saltRounds = 10;
const db = require('./index');

process.on('unhandledRejection', (reason, promise) => {
  console.log(reason, promise);
});

const makeQuerySelectUser = ({ id, email }) => {
  const condition = id ? 'id' : 'email';
  return {
    text: `SELECT * FROM auth WHERE ${condition} = $1`,
    values: [id || email],
  };
};

function getUser(args) {
  return db.query(makeQuerySelectUser(args)).then(res => {
    console.log(res.rows[0]);
    return res.rows[0];
  });
}

const makeQueryInsertUser = async ({ username, email, password }) => {
  // console.log('inserting user', username, email, password);
  const hash = await bcrypt.hash(password, saltRounds);
  return {
    text:
      'INSERT INTO auth(name, email, password) VALUES($1, $2, $3) RETURNING *',
    values: [username, email, hash],
  };
};

async function createUser(args) {
  console.log('creating user');
  const query = await makeQueryInsertUser(args);
  return db.query(query).then(res => {
    // console.log(res);
    return res.rows[0];
  });
}

async function authenticateUser({ id, email, password }) {
  const { password: hash } = await getUser({ id, email });
  return await bcrypt.compare(password, hash);
}

module.exports = { getUser, createUser, authenticateUser };
