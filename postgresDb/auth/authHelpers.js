const db = require('../index');
const { makeQuery, makeQuerySelectUser, cleanProps } = require('../pgHelpers');

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
  const row = await getUser(id);
  //   console.log('checking id', row);
  if (row) return [row];
  return false;
}

function getUser(id) {
  return db.query(makeQuerySelectUser(id)).then(res => {
    const user = res.rows[0];
    if (!user) return null;
    cleanProps(user);
    return user;
  });
}

module.exports = {
  checkUsername,
  checkEmail,
  checkId,
  checkIfDuplicate,
  getUser,
  checkRecord,
};
