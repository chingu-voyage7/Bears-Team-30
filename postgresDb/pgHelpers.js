const bcrypt = require('bcryptjs');
const saltRounds = 10;
const TEXTFIELDS = ['userid', 'text', 'image', 'date', 'start_date', 'status'];
const db = require('./index');

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
  from = '',
  condition = '',
  conditionProps = [],
  secondCondition = '',
  secondConditionProps = [],
  returning = '',
  orderBy = '',
  limit = '',
  offset = '',
}) => {
  const values = [];
  let valueIndex = 1;
  const clauses = parseClause(clause, clauseProps);
  const conditions = parseClause(condition, conditionProps);
  const secondConditions = parseClause(secondCondition, secondConditionProps);

  const fromClause = from ? `FROM ${from}` : '';
  const orderClause = orderBy ? `ORDER BY ${orderBy}` : '';
  const offsetClause = offset ? `OFFSET ${offset}` : 'OFFSET 0';
  const limitClause = limit ? `LIMIT ${limit} ${offsetClause}` : '';

  const text = `${query} ${clauses} ${fromClause} ${conditions} ${secondConditions} ${orderClause} ${returning} ${limitClause}`.trim();

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
      .join(', ');
    return `${clauseText} ${clauseValues}`;
  }
};

function getWithId(idObj, table) {
  const QUERY = makeQuery({
    query: `SELECT * FROM ${table}`,
    clause: 'WHERE',
    clauseProps: idObj,
  });
  return db
    .query(QUERY)
    .then(res => {
      const results = res.rows;
      results.forEach(row => {
        cleanProps(row);
      });
      return results;
    })
    .catch(err => {
      console.error(err);
      return err;
    });
}

function selectWithPagination(
  idObj,
  { table = null, customQuery = null, order, limit, offset, groupBy = null }
) {
  const query = customQuery || `SELECT * FROM ${table}`;
  return makeQuery({
    query,
    clause: 'WHERE',
    clauseProps: idObj,
    condition: groupBy,
    orderBy: order,
    limit,
    offset,
  });
}

function makeInsert(table, valuesObj, { forceText } = {}) {
  const cols = Object.keys(valuesObj);
  const vals = [];
  let textfields = TEXTFIELDS;
  if (forceText) {
    textfields = [...TEXTFIELDS, ...forceText];
  }
  cols.forEach(col => {
    if (textfields.includes(col)) {
      vals.push(`'${valuesObj[col]}'`);
    } else {
      vals.push(valuesObj[col]);
    }
  });

  return `INSERT INTO ${table}(${cols.join(', ')}) VALUES(${vals.join(
    ', '
  )}) RETURNING *`;
}

function insert(QUERY) {
  return db.query(QUERY).then(res => {
    const results = res.rows[0];
    cleanProps(results);
    return results;
  });
}

function makeUpdate(table, valuesObj, idObj, userid) {
  const QUERY = makeUpdateQuery(table, valuesObj, idObj, userid);
  return db.query(QUERY).then(res => {
    const results = res.rows[0];
    if (!results) {
      const err = new Error(
        'MakeUpdate: Unable to update because entry does not exist, or user does not have permission to update it.'
      );
      err.code = 'e416';
      throw err;
    }
    cleanProps(results);
    return results;
  });
}

function makeUpdateQuery(table, valuesObj, idObj, userid) {
  valuesObj.updated_at = new Date();

  return makeQuery({
    query: `UPDATE ${table}`,
    clause: 'SET',
    clauseProps: valuesObj,
    condition: 'WHERE',
    conditionProps: idObj,
    secondCondition: userid ? 'AND' : null,
    secondConditionProps: { userid },
    returning: 'RETURNING *',
  });
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

function deleteWithId(table, id, userid) {
  const QUERY = makeDeleteWithIdQuery(table, id, userid);

  return db.query(QUERY).then(res => {
    const results = res.rows[0];
    if (!results) {
      const err = new Error(
        'deleteWithId: Unable to delete because row id does not exist, or user does not have permission to modify it.'
      );
      err.code = 'e416';
      throw err;
    }
    cleanProps(results);
    return results;
  });
}

function makeDeleteWithIdQuery(table, id, userid) {
  return makeQuery({
    query: `DELETE FROM ${table}`,
    clause: 'WHERE',
    clauseProps: { id },
    condition: 'AND',
    conditionProps: { userid },
    returning: 'RETURNING *',
  });
}

module.exports = {
  makeQuery,
  getWithId,
  selectWithPagination,
  makeQueryInsertAuthInfo,
  makeQueryInsertUser,
  makeQuerySelectUser,
  cleanProps,
  renameProp,
  makeInsert,
  insert,
  makeUpdate,
  makeUpdateQuery,
  deleteWithId,
  makeDeleteWithIdQuery,
};
