const db = require('../index');
const {
  makeQuery,
  makeInsert,
  insert,
  makeUpdate,
  cleanProps,
  renameProp,
  getWithId,
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

function updateSubmission(submissionId, valuesObj) {
  const QUERY = makeUpdate('submissions', valuesObj, { id: submissionId });
  console.log(QUERY);
  return db
    .query(QUERY)
    .then(res => {
      console.log(res.rows);
      const result = res.rows[0];

      cleanProps(result);
      return result;
    })
    .catch(err => {
      console.error(err);
      return err;
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

function getLikes(submissionid) {
  return getWithId({ submissionid }, 'likes');
}

function getComments(submissionid) {
  return getWithId({ submissionid }, 'comments');
}

function getFavorites(submissionid) {
  return getWithId({ submissionid }, 'favorites');
}

function insertComment(submissionid, text, userid) {
  const QUERY = makeInsert('comments', { submissionid, text, userid });
  return insert(QUERY).catch(err => {
    console.error(err);
    return err;
  });
}

function insertLike(submissionid, userid) {
  const QUERY = makeInsert('likes', { submissionid, userid });
  return insert(QUERY).catch(err => {
    console.error(err);
    return err;
  });
}

function insertFavorite(submissionid, userid) {
  const QUERY = makeInsert('favorites', { submissionid, userid });
  return insert(QUERY).catch(err => {
    console.error(err);
    return err;
  });
}

module.exports = {
  insertSubmission,
  insertComment,
  insertFavorite,
  insertLike,
  getUserSubmissions,
  getLikes,
  getComments,
  getFavorites,
  updateSubmission,
};
