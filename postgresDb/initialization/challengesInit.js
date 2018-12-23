require('dotenv').config();
const db = require('../index');
const { makeQuery } = require('../pgHelpers');

console.log('intialize challenges');

const CHALLENGES_TABLE =
  'CREATE TABLE IF NOT EXISTS challenge_groups(id SERIAL PRIMARY KEY, name CITEXT UNIQUE NOT NULL, description TEXT NOT NULL, category TEXT NOT NULL, goal_action TEXT NOT NULL, goal_number TEXT NOT NULL, goal_type TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now())';

// id (d), userid(R), challengeid(R), created_at (d), updated_at(d), progress(d), goal (R), status(d), start_date
const USER_CHALLENGES_TABLE = `CREATE TABLE IF NOT EXISTS user_challenges(id SERIAL UNIQUE NOT NULL, userid UUID REFERENCES auth(id) NOT NULL, challengeid INTEGER REFERENCES challenge_groups(id) NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), progress INTEGER NOT NULL DEFAULT 0, goal INTEGER NOT NULL, status TEXT NOT NULL DEFAULT 'IN_PROGRESS', start_date DATE, PRIMARY KEY (userid, challengeid))`;

const DEFAULT_CHALLENGES = [
  `('JavaScript', 'Become a better web developer by building JavaScript projects.', 'TECHNOLOGY', 'Create', 50, 'projects')`,
  `('Running', 'Whether for marathon training or just daily exercise, improve your health by running.', 'HEALTH_WELLNESS', 'Run', 300, 'miles')`,
  `('Watercolor', 'Break out your best brushes, paints, and thick paper and get painting!', 'ART', 'Paint', 60, 'paintings')`,
];

const POPULATE_CHALLENGES = makeQuery({
  query: `INSERT INTO challenge_groups(name, description, category, goal_action, goal_number, goal_type) VALUES ${DEFAULT_CHALLENGES.join(
    ', '
  )}`,
  returning: 'RETURNING *',
});

const DEFAULT_USER_CHALLENGES = [
  `(1,'7aeb5590-a92e-4720-9b12-4cca8b083c9b',0,50)`,
  `(2,'7aeb5590-a92e-4720-9b12-4cca8b083c9b',0,50)`,
  `(3,'7aeb5590-a92e-4720-9b12-4cca8b083c9b',0,50)`,
];

const POPULATE_USER_CHALLENGES = `
INSERT INTO user_challenges(challengeid, userid, progress, goal) VALUES ${DEFAULT_USER_CHALLENGES.join(
  ', '
)}
`;

async function buildTables() {
  try {
    const client = await db.getClient();
    await client.query(CHALLENGES_TABLE);
    await client.query(USER_CHALLENGES_TABLE);
    // await client.query(POPULATE_CHALLENGES.text);
    await client.query(POPULATE_USER_CHALLENGES);
    client.release();
  } catch (err) {
    console.error(err);
  }
}

buildTables();
