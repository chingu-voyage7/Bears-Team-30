const db = require('./index');
const jwt = require('jsonwebtoken');
const { makeQuery, makeQuerySelectUser } = require('./pgHelpers');

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
  //   console.log('checking username', rows);
  if (rows[0]) return rows;
  return false;
}

async function checkEmail(email) {
  const rows = await checkRecord('email', email, 'auth');
  //   console.log('checking email', rows);
  if (rows[0]) return rows;
  return false;
}

async function checkId(id) {
  const row = await getUser(null, { id: { id } });
  //   console.log('checking id', row);
  if (row) return [row];
  return false;
}

function getUser(parent, args) {
  return db.query(makeQuerySelectUser(args.id)).then(res => {
    if (!res.rows[0]) return null;
    const { created_at: createdAt, updated_at: updatedAt } = res.rows[0];
    return { ...res.rows[0], createdAt, updatedAt };
  });
}

function generateJWTToken(id) {
  return jwt.sign(JSON.stringify(id), process.env.JWT_SECRET);
}

function getUserId(token, requireAuth = true) {
  if (token.length > 0) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  if (requireAuth) {
    throw new Error('Please log in to complete this action.');
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
