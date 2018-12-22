const db = require('../index');
const {
  makeQuery,
  makeInsert,
  cleanProps,
  renameProp,
} = require('../pgHelpers');

function insertSubmission(data) {
  console.log(data);
  const QUERY = makeInsert('submissions', data);
  console.log(QUERY);
  return db.query(QUERY).then(res => {
    const results = res.rows[0];
    cleanProps(results);
    return results;
  });
}

function getUserSubmissions(idOne, idTwo) {
  const QUERY = makeQuery({
    query: 'SELECT * FROM submissions',
    clause: 'WHERE',
    clauseProps: idOne,
    condition: idTwo ? 'AND' : null,
    conditionProps: idTwo,
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

module.exports = { insertSubmission, getUserSubmissions };
