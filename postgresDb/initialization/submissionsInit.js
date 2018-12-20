require('dotenv').config();
const db = require('../index');
const { makeQuery } = require('../pgHelpers');

// id, userid, userchallengeid, progress, day, text, image, created_at, updated_at
const SUBMISSIONS_TABLE =
  'CREATE TABLE IF NOT EXISTS submissions(id SERIAL PRIMARY KEY, userid UUID REFERENCES auth(id) NOT NULL, userchallengeid INTEGER REFERENCES user_challenges(id) NOT NULL, progress INTEGER NOT NULL, day INTEGER NOT NULL, created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now(), text TEXT, image TEXT';

// userid, submissionid, text, created_at, updated_at
const COMMENTS_TABLE =
  'CREATE TABLE IF NOT EXISTS comments(id SERIAL NOT NULL, userid UUID REFERENCES auth(id) NOT NULL, submissionid INTEGER REFERENCES submissions(id) NOT NULL, text TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now(), PRIMARY KEY(userid, submissionid)';

// userid, submissionid, created_at, updated_at
const LIKES_TABLE =
  'CREATE TABLE IF NOT EXISTS comments(id SERIAL NOT NULL, userid UUID REFERENCES auth(id) NOT NULL, submissionid INTEGER REFERENCES submissions(id) NOT NULL, created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now(), PRIMARY KEY(userid, submissionid)';

// userid, submissionid, created_at, updated_at
const FAVORITES_TABLE =
  'CREATE TABLE IF NOT EXISTS comments(id SERIAL NOT NULL, userid UUID REFERENCES auth(id) NOT NULL, submissionid INTEGER REFERENCES submissions(id) NOT NULL, created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now(), PRIMARY KEY(userid, submissionid)';

async function buildTables() {
  try {
    const client = await db.getClient();
    await client.query(SUBMISSIONS_TABLE);
    await client.query(COMMENTS_TABLE);
    await client.query(LIKES_TABLE);
    await client.query(FAVORITES_TABLE);
    client.release();
  } catch (err) {
    console.error(err);
  }
}

buildTables();
