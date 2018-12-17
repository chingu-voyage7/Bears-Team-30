const bcrypt = require('bcryptjs');
const saltRounds = 10;

const makeQuerySelectAuthInfo = ({ id, email }) => {
  const condition = id ? 'id' : 'email';
  return {
    text: `SELECT * FROM auth WHERE ${condition} = $1`,
    values: [id || email],
  };
};

const makeQueryInsertAuthInfo = async ({ username, email, password }) => {
  const hash = await bcrypt.hash(password, saltRounds);
  return {
    text:
      'INSERT INTO auth(username, email, password) VALUES($1, $2, $3) RETURNING *',
    values: [username, email, hash],
  };
};

const makeQuerySelectUser = ({ id, username }) => {
  const condition = id ? 'id' : 'username';
  return {
    text: `SELECT * FROM auth WHERE ${condition} = $1`,
    values: [id || username],
  };
};

const makeQueryInsertUser = ({ id }) => ({
  text: 'INSERT INTO users(id) VALUES($1) RETURNING *',
  values: [id],
});

function makeUpdateRecordQuery(propName, propValue, table, id){
  return makeQuery({
    query: `UPDATE ${table}`,
    clause: `SET`,
    clauseProps: {}

  })
}

const makeQuery = ({
  query,
  clause = '',
  clauseProps = [],
  condition = '',
  conditionProps = [],
  returning = '',
}) => {
  const values = [];
  let valueIndex = 1;
  const clauses = parseClause(clause, clauseProps);
  const conditions = parseClause(condition, conditionProps);
  const text = `${query} ${clauses} ${conditions} ${returning}`.trim();

  return {
    text,
    values,
  };

  function parseClause(clauseText, clauseObj) {
    if (!clauseText) return '';
    if (!clauseObj) return clauseText;
    const clauseValues = Object.keys(clauseObj)
      .map(prop => {
        values.push(clauseObj[prop]);
        return `${prop} = $${valueIndex++}`;
      })
      .join(',');
    return `${clauseText} ${clauseValues}`
  }
};

module.exports = {
  makeQuery,
  makeQueryInsertAuthInfo,
  makeQueryInsertUser,
  makeQuerySelectAuthInfo,
  makeQuerySelectUser,
};
