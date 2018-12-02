const bcrypt = require('bcryptjs');
const saltRounds = 10;
const db = require('./index');
const {
  makeQuery,
  makeQueryInsertAuthInfo,
  makeQueryInsertUser,
  makeQuerySelectAuthInfo,
  makeQuerySelectUser,
} = require('./helpers');

function getAuthInfo(parent, args) {
  return db.query(makeQuerySelectAuthInfo(args)).then(res => {
    console.log('auth info retrieved:', res.rows[0]);
    return res.rows[0];
  });
}

function getUser(parent, args) {
  return db.query(makeQuerySelectUser(args)).then(res => {
    console.log(res.rows[0]);
    return res.rows[0];
  });
}

async function createUser(parent, { data }) {
  const authQuery = await makeQueryInsertAuthInfo(data);
  const newUser = await db
    .query(authQuery)
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      console.error(err);
      if (err.code === '23505') isDuplicate = true;
      return null;
    });

  if (!newUser) return { id: 'A user with this email already exists.' };
  const addUserQuery = makeQueryInsertUser(newUser);
  return db.query(addUserQuery).then(res => {
    const { created_at: createdAt, updated_at: updatedAt } = res.rows[0];
    return { ...res.rows[0], createdAt, updatedAt };
  });
}

async function authenticateUser(parent, { id, email, password }) {
  const { password: hash, username } =
    (await getAuthInfo(null, { id, email })) || {};
  if (!hash) return { isAuthenticated: false, id, email, username };
  const isAuthenticated = await bcrypt.compare(password, hash);
  return { isAuthenticated, id, email, username };
}

module.exports = { getAuthInfo, createUser, authenticateUser, getUser };
