const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('./index');


process.on('unhandledRejection', (reason, promise) => {
    console.log(reason, promise);
  });

const selectUser = ({ id, email }) => {
  const condition = id ? 'id' : 'email';
  return {
    text: `SELECT * FROM auth WHERE ${condition} = $1`,
    value: [id || email],
  };
};

function getUserHandler(args) {
  return db.query(selectUser(args)).then(res => {
    console.log(res);
    return res.rows[0];
  });
}

const insertUser = async ({ username, email, password }) => {
  console.log('inserting user', username, email, password);
  const salt = await bcrypt.genSalt(saltRounds);
  console.log(salt);
  const hash = await bcrypt.hash(password, salt);
  console.log('password hashed');
  return {
    text:
      'INSERT INTO auth(name, email, password) VALUES($1, $2, $3) RETURNING *',
    value: [username, email, hash],
  };
};

async function createUserHandler(args) {
  const query = await insertUser(args);
  console.log(query);
  return db.query(query).then(res => {
    console.log(res);
    return res.rows[0];
  });
}


async function test(){

  try {
    console.log('testing add user');
    const testUser = {
      username: 'Paul',
      email: 'wiarda@gmail.com',
      password: 'test',
    };
    await createUserHandler(testUser);
    await insertUser(testUser).then(res => {
      console.log(res);
    });
  } catch (err) {
    console.log(err);
  }
};
test()

module.exports = { getUserHandler, createUserHandler };
