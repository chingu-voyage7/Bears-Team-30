const bcrypt = require('bcryptjs');
const saltRounds = 10;

const makeQueryInsertAuthInfo = async ({ username, email, password }) => {
  const hash = await bcrypt.hash(password, saltRounds);
  return {
    text:
      'INSERT INTO auth(username, email, password) VALUES($1, $2, $3) RETURNING *',
    values: [username, email, hash],
  };
};

const makeQuerySelectUser = ({ id, username, email }) => {
  let condition;
  if (id) {
    condition = 'id';
  } else if (username) {
    condition = 'username';
  } else condition = 'email';

  return {
    text: `SELECT * FROM auth WHERE ${condition} = $1`,
    values: [id || username || email],
  };
};

const makeQueryInsertUser = ({ id }) => ({
  text: 'INSERT INTO users(id) VALUES($1) RETURNING *',
  values: [id],
});

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
    return `${clauseText} ${clauseValues}`;
  }
};

function setTimeProps(obj) {
  renameProp(obj, 'created_at', 'createdAt');
  renameProp(obj, 'updated_at', 'updatedAt');
}

function cleanProps(obj) {
  const props = Object.keys(obj);
  let re = /_/;
  props.forEach(prop => {
    if (re.test(prop)) {
      const newName = prop.replace(/_./g, match => match[1].toUpperCase());
      renameProp(obj, prop, newName);
    }
  });
}

function renameProp(obj, oldName, newName) {
  if (obj[oldName]) {
    obj[newName] = obj[oldName];
    delete obj[oldName];
  }
}

module.exports = {
  makeQuery,
  makeQueryInsertAuthInfo,
  makeQueryInsertUser,
  makeQuerySelectUser,
  cleanProps,
};
