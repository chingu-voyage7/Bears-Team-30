const bcrypt = require('bcryptjs');
const saltRounds = 10;

const db = require('./index');
const {
  makeQuery,
  makeQueryInsertAuthInfo,
  makeQueryInsertUser,
} = require('./pgHelpers');

const {
  checkIfDuplicate,
  getAuthInfo,
  getUser,
  checkUsername,
  checkEmail,
  checkId,
} = require('./authHelpers');

const SUCCESS = {
  code: 200,
  success: true,
  message: 'Success',
};

async function test(parent, { value }) {
  console.log('test:', value);
  const res = await checkId(value);
  console.log('result:', res);
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
    return {
      code: 410,
      success: false,
      message: 'A user with this email or username already exists.',
    };
  const addUserQuery = makeQueryInsertUser(newUser);
  return db.query(addUserQuery).then(res => {
    return {
      ...SUCCESS,
      message: 'New user created.',
      user: {
        ...newUser,
        createdAt: newUser.created_at,
        updatedAt: newUser.updated_at,
      },
    };
    // const { created_at: createdAt, updated_at: updatedAt } = newUser;
    // return { ...res.rows[0], createdAt, updatedAt };
  });
}

async function authenticateUser(parent, { id, email, password }) {
  const {
    password: hash,
    username,
    email: dbEmail,
    created_at: createdAt,
    updated_at: updatedAt,
  } = (await getAuthInfo(null, { id, email })) || {};
  if (!hash) return { isAuthenticated: false, id, email, username };
  const isAuthenticated = await bcrypt.compare(password, hash);
  return {
    isAuthenticated,
    user: { id, email: dbEmail, username, createdAt, updatedAt },
  };
}

async function updateUser(parent, { id, data }) {
  const { username, password, email } = data;
  // make sure email and username are unique
  // console.log('checking for pre-existing record');
  // console.log(id, username, email, password);
  const usernameRows = username && checkUsername(username);
  const emailRows = email && checkEmail(email);
  const idRows = id && checkId(id);

  const hash = password
    ? bcrypt.hash(password, saltRounds)
    : Promise.resolve(null);
console.log('email dup')
const emailIsDuplicate = await checkIfDuplicate(id, emailRows);
console.log('username dup')
  const usernameIsDuplicate = await checkIfDuplicate(id, usernameRows);
  const currentUserData = await idRows;

  if (emailIsDuplicate || usernameIsDuplicate || !currentUserData) {
    let usernameFeedback = usernameIsDuplicate
      ? `The username ${username} is already taken.`
      : username;
    let emailFeedback = emailIsDuplicate
      ? `The email address ${email} is already used by another account.`
      : email;
    let idFeedback = !currentUserData ? `${id} does not exist.` : id;

    const { created_at: createdAt = 'N/A', updated_at: updatedAt = 'N/A' } =
      currentUserData && currentUserData[0];

    return {
      code: 410,
      success: false,
      message: `Invalid request:${
        !currentUserData ? ' User ID does not exist.' : ''
      }${usernameIsDuplicate ? ' Username already taken.' : ''}${
        emailIsDuplicate ? ' Email already in use.' : ''
      }`,
      user: {
        id: idFeedback,
        username: usernameFeedback,
        email: emailFeedback,
        createdAt,
        updatedAt,
      },
    };
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
          ...SUCCESS,
          message: 'Update successful',
          user: {
            ...user,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
          },
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
    user = await client
      .query('DELETE FROM auth where id = $1 RETURNING *', [id])
      .then(res => res.rows[0]);
    await client.query('COMMIT');
  } catch (e) {
    console.error(e);
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
  if (user) {
    const { updated_at: updatedAt, created_at: createdAt } = await user;
    console.log(user, updatedAt);
    return {
      ...SUCCESS,
      message: 'User deleted.',
      user: { ...user, updatedAt, createdAt },
    };
  }
  return { code: 410, success: false, message: 'No user with this ID exists.' };
}

function Users() {
  return db.query('SELECT * FROM auth').then(res => {
    // console.log(res.rows[0]);
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
  test,
};
