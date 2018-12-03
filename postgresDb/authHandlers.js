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
    return res.rows[0];
  });
}

function getUser(parent, args) {
  return db.query(makeQuerySelectUser(args)).then(res => {
    if (!res.rows[0]) return { id: 'Invalid id' };
    const { created_at: createdAt, updated_at: updatedAt } = res.rows[0];
    return { ...res.rows[0], createdAt, updatedAt };
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

  if (!newUser)
    return { id: 'A user with this email or username already exists.' };
  const addUserQuery = makeQueryInsertUser(newUser);
  return db.query(addUserQuery).then(res => {
    return {
      ...newUser,
      createdAt: newUser.created_at,
      updatedAt: newUser.updated_at,
    };
    // const { created_at: createdAt, updated_at: updatedAt } = newUser;
    // return { ...res.rows[0], createdAt, updatedAt };
  });
}

async function authenticateUser(parent, { id, email, password }) {
  const { password: hash, username, email: dbEmail } =
    (await getAuthInfo(null, { id, email })) || {};
  if (!hash) return { isAuthenticated: false, id, email, username };
  const isAuthenticated = await bcrypt.compare(password, hash);
  return { isAuthenticated, id, email: dbEmail, username };
}

function getAuthRecords(propName, propValue, table) {
  const query = makeQuery({
    query: `SELECT id, ${propName} FROM ${table}`,
    clause: `WHERE`,
    clauseProps: { [propName]: propValue },
  });
  return db.query(query).then(res => {
    return res.rows;
  });
}

async function checkIfDuplicate(id, rows) {
  const [row] = rows && (await rows);
  if (row) {
    // console.log('checking if duplicate', id, row);
    return id !== row.id;
  }
  return false;
}

async function updateUser(parent, { id, data }) {
  const { username, password, email } = data;
  // make sure email and username are unique
  // console.log('checking for pre-existing record');
  // console.log(id, username, email, password);
  const usernameRows = username && getAuthRecords('username', username, 'auth');
  const emailRows = email && getAuthRecords('email', email, 'auth');
  const idRows = id && getAuthRecords('id', id, 'auth');
  const hash = password
    ? bcrypt.hash(password, saltRounds)
    : Promise.resolve(null);

  const emailIsDuplicate = await checkIfDuplicate(id, emailRows);
  const usernameIsDuplicate = await checkIfDuplicate(id, usernameRows);
  const idNotFound = (await idRows.length) === 0;
  if (emailIsDuplicate || usernameIsDuplicate || idNotFound) {
    let usernameFeedback = usernameIsDuplicate
      ? `The username ${username} is already taken.`
      : username;
    let emailFeedback = emailIsDuplicate
      ? `The email address ${email} is already being used by another account.`
      : email;
    let idFeedback = idNotFound ? `${id} does not exist.` : id;
    return { id: idFeedback, username: usernameFeedback, email: emailFeedback };
  }

  // update the user
  data.updated_at = new Date().toUTCString();

  return hash.then(res => {
    if (res) data.password = res;

    const updateQuery = makeQuery({
      query: 'UPDATE auth',
      clause: 'SET',
      clauseProps: data,
      condition: `WHERE id = '${id}'`,
      returning: 'RETURNING id, username, email, created_at, updated_at',
    });
    // console.log(updateQuery);
    return db
      .query(updateQuery)
      .then(res => {
        const user = res.rows[0];
        return {
          ...user,
          createdAt: user.created_at,
          updatedAt: user.updated_at,
        };
      })
      .catch(err => {
        console.error(err);
        return err;
      });
  });
}

async function deleteUser(parent, { id }) {
  console.log('deleting user', id);
  const client = await db.getClient();
  let user;
  try {
    await client.query('BEGIN');
    await client.query('DELETE FROM users where id = $1', [id]);
    user = await client.query('DELETE FROM auth where id = $1 RETURNING *', [
      id,
    ]);
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error(e);
    throw e;
  } finally {
    client.release();
  }
  const { updated_at: updatedAt, created_at: createdAt } = await user;
  console.log(user, updatedAt)
  return { ...user, updatedAt, createdAt };
}

function Users() {
  return db.query('SELECT * FROM auth').then(res => {
    console.log(res.rows);
    return res.rows;
  });
}

module.exports = {
  getAuthInfo,
  createUser,
  authenticateUser,
  getUser,
  updateUser,
  deleteUser,
  Users,
};
