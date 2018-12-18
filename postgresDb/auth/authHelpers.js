const db = require('../index');
const { makeQuery, makeQuerySelectUser, cleanProps } = require('../pgHelpers');
const jwt = require('jsonwebtoken');

async function checkIfDuplicate(id, rows) {
  const duplicate = await rows;
  if (duplicate && duplicate[0]) {
    return id !== duplicate[0].id;
  }
  return false;
}

function checkRecord(propName, propValue, table) {
  const query = makeQuery({
    query: `SELECT id, ${propName} FROM ${table}`,
    clause: `WHERE`,
    clauseProps: { [propName]: propValue },
  });
  return db.query(query).then(res => {
    return res.rows;
  });
}

async function checkUsername(username) {
  const rows = await checkRecord('username', username, 'auth');
  if (rows[0]) return rows;
  return false;
}

async function checkEmail(email) {
  const rows = await checkRecord('email', email, 'auth');
  if (rows[0]) return rows;
  return false;
}

async function checkId(id) {
  const row = await getUser(id);
  if (row) return [row];
  return false;
}

function getUser({ id, username, email }) {
  return db.query(makeQuerySelectUser({ id, username, email })).then(res => {
    const user = res.rows[0];
    if (!user) return null;
    cleanProps(user);
    return user;
  });
}

function generateJWTToken(id) {
  return jwt.sign(JSON.stringify(id), process.env.JWT_SECRET);
}

function getUserId(token, { requireAuth } = {}) {
  if (requireAuth) {
    throw new Error('Please log in to complete this action.');
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET).replace(/"/g, '');
  } catch (err) {
    console.error(err);
  }
  return null;
}

module.exports = {
  checkEmail,
  checkId,
  checkIfDuplicate,
  checkRecord,
  checkUsername,
  generateJWTToken,
  getUser,
  getUserId,
};
