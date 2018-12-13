require('dotenv').config();
const db = require('../index');
const { makeQuery } = require('../pgHelpers');

console.log('intialize challenges');

const CHALLENGES_TABLE =
  'CREATE TABLE IF NOT EXISTS challenge_groups(id SERIAL PRIMARY KEY, name CITEXT UNIQUE NOT NULL, description TEXT NOT NULL, category TEXT NOT NULL, goal_action TEXT NOT NULL, goal_number TEXT NOT NULL, goal_type TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now())';

const USER_CHALLENGES_TABLE =
  'CREATE TABLE IF NOT EXISTS user_challenges(id SERIAL NOT NULL, userid UUID REFERENCES auth(id) NOT NULL, challengeid INTEGER REFERENCES challenges(id) NOT NULL, start_date timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), progress INTEGER NOT NULL DEFAULT 0, goal INTEGER NOT NULL, status TEXT NOT NULL DEFAULT IN_PROGRESS, PRIMARY KEY (userid, challengeid))';

const SUBMISSIONS_TABLE =
  'CREATE TABLE IF NOT EXISTS submissions(id SERIAL NOT NULL, userid UUID REFERENCES auth(id) NOT NULL, challengeid INTEGER REFERENCES challenges(id) NOT NULL, day INTEGER NOT NULL, created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now(), description TEXT, image TEXT, PRIMARY KEY(userid, challengeid, day_number))';

const DEFAULT_CHALLENGES = [
  "('JavaScript', 'Become a better web developer by building JavaScript projects.', 'TECHNOLOGY', 'Create', 50, 'projects')",
  "('Running', 'Whether for marathon training or just daily exercise, improve your health by running.', 'HEALTH_WELLNESS', 'Run', 300, 'miles')",
  "('Watercolor', 'Break out your best brushes, paints, and thick paper and get painting!', 'ART', 'Paint', 60, 'paintings')",
];

const POPULATE_CHALLENGES = makeQuery({
  query: `INSERT INTO challenges(name, description, category, goal_action, goal_number, goal_type) VALUES ${DEFAULT_CHALLENGES.join(
    ', '
  )}`,
  returning: 'RETURNING *',
});

async function buildTables() {
  try {
    const client = await db.getClient();
    await client.query(CHALLENGES_TABLE);
    await client.query(USER_CHALLENGES_TABLE);
    await client.query(SUBMISSIONS_TABLE);
    await client.query(POPULATE_CHALLENGES.text);
    client.release();
  } catch (err) {
    console.error(err);
  }
}

buildTables();
