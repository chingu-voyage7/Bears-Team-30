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
    text: `SELECT * FROM users WHERE ${condition} = $1`,
    values: [id || username],
  };
};

const makeQueryInsertUser = ({ id, username }) => ({
  text: 'INSERT INTO users(id, username) VALUES($1, $2) RETURNING *',
  values: [id, username],
});

const makeQuery = ({
  query,
  clause,
  clauseProps,
  condition,
  conditionProps,
}) => {
  const values = [];
  const clauses = parseClause(clause, clauseProps);
  const conditions = parseClause(condition, conditionProps);

  return {
    text: `${query} ${clauses} ${conditions}`,
    values,
  };

  function parseClause(clauseText, clauseObj) {
    if (!clauseText) return null;
    return Object.keys(clauseObj)
      .map(prop => {
        values.push(clauseObj[prop]);
        return `${clauseText} prop`;
      })
      .join(',');
  }
};

module.exports = {
  makeQuery,
  makeQueryInsertAuthInfo,
  makeQueryInsertUser,
  makeQuerySelectAuthInfo,
  makeQuerySelectUser,
};
