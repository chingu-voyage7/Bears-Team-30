const db = require('../index');
const {
  makeQuery,
  makeInsert,
  cleanProps,
  renameProp,
} = require('../pgHelpers');