// Needs updating
const db = require('./index');

const USERS_TABLE =
  'CREATE TABLE users(id UUID PRIMARY KEY, username TEXT not null unique, journeys TEXT [])';

const AUTH_TABLE =
  'CREATE TABLE auth(id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), username text not null, email CITEXT not null unique, password TEXT not null, created_at timestamptz NOT NULL default now(), updated_at timestamptz NOT NULL default now())';