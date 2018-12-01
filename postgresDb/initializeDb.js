const db = require('./index');

const CREATE_USERS_TABLE =
  'CREATE TABLE users(id UUID PRIMARY KEY, username TEXT not null unique, journeys TEXT [])';
const POPULATE_USERS_TABLE =
  'INSERT INTO users(name, journeys) VALUES($1, $2) RETURNING *';
const USER_VALUES = [['Paul', [1, 2]], ['Gertrude', [3]], ['Pablo', [4]]];

const CREATE_JOURNEYS_TABLE =
  'CREATE TABLE journeys(id SERIAL PRIMARY KEY, name VARCHAR(100) not null, days JSON [])';
const POPULATE_JOURNEYS_TABLE =
  'INSERT INTO journeys(name, days) VALUES($1, $2) RETURNING *';
const JOURNEY_VALUES = [
  [
    'GraphQl',
    [
      { dayNumber: '1', content: 'Installed Apollo server' },
      { dayNumber: '2', content: 'Made a query' },
    ],
  ],
  ['PostgresSQL', [{ dayNumber: '1', content: 'Installed postgres' }]],
  ['Poetry', [{ dayNumber: '1', content: 'Tender Buttons' }]],
  ['Oil painting', [{ dayNumber: '1', content: 'Guernica' }]],
];

const CREATE_AUTH_TABLE =
  'CREATE TABLE auth(id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), username text not null, email CITEXT not null unique, password TEXT not null, created_at timestamptz NOT NULL default now(), updated_at timestamptz NOT NULL default now())';

// Populate USERS table
const populateUsers = async () => {
  try {
    console.log('initializing users table');
    const result = await db.query(CREATE_USERS_TABLE);
    USER_VALUES.forEach(user => {
      db.query(POPULATE_USERS_TABLE, user);
      console.log('adding', user);
    });
  } catch (err) {
    console.error(err);
  }
};

// Populate journeys table
const populateJourneys = async () => {
  try {
    console.log('initializing journeys table');
    const result = await db.query(CREATE_JOURNEYS_TABLE);
    console.log('journeys table created:', result);
    JOURNEY_VALUES.forEach(journey => {
      db.query(POPULATE_JOURNEYS_TABLE, journey);
      console.log('adding', journey);
    });
  } catch (err) {
    console.error(err);
  }
};

console.log('test');
// Create auth table
const createAuthTable = () => {
  console.log('creating auth table');
  db.query(CREATE_AUTH_TABLE)
    .then(success => {
      console.log('auth table created');
    })
    .catch(err => err);
};

createAuthTable();
