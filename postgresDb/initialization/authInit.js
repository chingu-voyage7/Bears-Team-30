require('dotenv').config();
const db = require('../index');

const AUTH_TABLE =
  'CREATE TABLE IF NOT EXISTS auth(id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), username text not null, email CITEXT not null unique, password TEXT not null, created_at timestamptz NOT NULL default now(), updated_at timestamptz NOT NULL default now())';

  db.query(AUTH_TABLE);