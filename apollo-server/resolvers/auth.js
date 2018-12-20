const bcrypt = require('bcryptjs');
const saltRounds = 10;

const db = require('../../postgresDb/index');
const {
  makeQuery,
  makeQueryInsertAuthInfo,
  makeQueryInsertUser,
} = require('../../postgresDb/pgHelpers');

const {
  checkIfDuplicate,
  checkUsername,
  checkEmail,
  checkId,
  getUser: getUserHelper,
  generateJWTToken,
  getUserId,
} = require('../../postgresDb/auth/authHelpers');

const SUCCESS = {
  code: 's200',
  success: true,
  message: 'Success',
};

async function createUser(parent, { data }) {
  const { email, username } = data;
  const usernameRows = checkUsername(username);
  const emailRows = checkEmail(email);

  const authQuery = await makeQueryInsertAuthInfo(data);
  const newUser = await db
    .query(authQuery)
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      console.error(err);
      return null;
    });

  if (!newUser) {
    const isUsernameTaken = await usernameRows;
    const isEmailTaken = await emailRows;

    let message, code;
    if (isUsernameTaken && isEmailTaken) {
      message = 'Username and email are already taken.';
      code = 'e411';
    } else if (isUsernameTaken) {
      message = 'Username is already used by another account.';
      code = 'e412';
    } else if (isEmailTaken) {
      message = 'Email is already used by another account.';
      code = 'e413';
    } else {
      message = 'Error creating user.';
      code = 'e410';
    }

    return {
      code,
      success: false,
      message,
    };
  }

  const addUserQuery = makeQueryInsertUser(newUser);
  const token = generateJWTToken(newUser.id);
  return db.query(addUserQuery).then(res => {
    return {
      ...SUCCESS,
      message: 'New user created.',
      token,
      user: {
        ...newUser,
        createdAt: newUser.created_at,
        updatedAt: newUser.updated_at,
      },
    };
  });
}

/**
 * Checks if a valid token generated a userid
 */
async function auth(parent, args, { id }) {
  return { isAuthenticated: !!id };
}

async function loginUser(parent, { username, password }) {
  const row = await getUserHelper({ username });

  const isAuthenticated = await bcrypt.compare(password, row.password);

  let token = null;

  if (isAuthenticated) {
    token = generateJWTToken(row.id);
  }

  return {
    token,
  };
}

async function updateUser(parent, { id, data }) {
  const { username, password, email } = data;
  // make sure email and username are unique

  const usernameRows = username && checkUsername(username);
  const emailRows = email && checkEmail(email);
  const idRows = id && checkId(id);

  const hash = password
    ? bcrypt.hash(password, saltRounds)
    : Promise.resolve(null);

  const emailIsDuplicate = await checkIfDuplicate(id, emailRows);
  const usernameIsDuplicate = await checkIfDuplicate(id, usernameRows);
  const currentUserData = await idRows;

  if (emailIsDuplicate || usernameIsDuplicate || !currentUserData) {
    const { created_at: createdAt = 'N/A', updated_at: updatedAt = 'N/A' } =
      currentUserData && currentUserData[0];

    let code;
    if (!currentUserData) {
      code = 'e414';
    } else if (emailIsDuplicate && usernameIsDuplicate) {
      code = 'e411';
    } else if (usernameIsDuplicate) {
      code = 'e412';
    } else if (emailIsDuplicate) {
      code = 'e413';
    } else code = 'e410';

    return {
      code,
      success: false,
      message: `Invalid request:${
        !currentUserData ? ' User ID does not exist.' : ''
      }${usernameIsDuplicate ? ' Username already taken.' : ''}${
        emailIsDuplicate ? ' Email already in use.' : ''
      }`,
      user: {
        ...currentUserData[0],
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
    return {
      ...SUCCESS,
      message: 'User deleted.',
      user: { ...user, updatedAt, createdAt },
    };
  }
  return {
    code: 'e414',
    success: false,
    message: 'No user with this ID exists.',
  };
}

function users() {
  return db.query('SELECT * FROM auth').then(res => {
    return res.rows;
  });
}

function me(parent, args, { id }) {
  if (!id) throw new Error('User not logged in.');
  return getUserHelper({ id });
}

function getUser(parent, { id: { id, username, email } }) {
  return getUserHelper({ id, username, email });
}

module.exports = {
  createUser,
  auth,
  getUser,
  loginUser,
  updateUser,
  deleteUser,
  users,
  me,
};
