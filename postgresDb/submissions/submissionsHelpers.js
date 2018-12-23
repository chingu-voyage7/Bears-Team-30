const db = require('../index');
const {
  makeQuery,
  makeInsert,
  insert,
  makeUpdate,
  cleanProps,
  getWithId,
  deleteWithId,
} = require('../pgHelpers');

function insertSubmission(data) {
  const QUERY = makeInsert('submissions', data);
  return db.query(QUERY).then(res => {
    const results = res.rows[0];
    cleanProps(results);
    return results;
  });
}

function updateSubmission(submissionId, valuesObj, userid) {
  return makeUpdate('submissions', valuesObj, { id: submissionId }, userid);
}

function getUserSubmissions(idOne, idTwo) {
  const QUERY = makeQuery({
    query: 'SELECT * FROM submissions',
    clause: 'WHERE',
    clauseProps: idOne,
    condition: idTwo ? 'AND' : null,
    conditionProps: idTwo,
  });
  return db.query(QUERY).then(res => {
    const results = res.rows;
    results.forEach(row => {
      cleanProps(row);
    });
    return results;
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
  return insert(QUERY);
}

function insertLike(submissionid, userid) {
  const QUERY = makeInsert('likes', { submissionid, userid });
  return insert(QUERY);
}

function insertFavorite(submissionid, userid) {
  const QUERY = makeInsert('favorites', { submissionid, userid });
  return insert(QUERY);
}

function deleteSubmission(submissionId, userid) {
  return deleteWithId('submissions', submissionId, userid);
}

function deleteComment(commentId, userid) {
  return deleteWithId('comments', commentId, userid);
}

function deleteLike(likeId, userid) {
  return deleteWithId('likes', likeId, userid);
}

function deleteFavorite(favoriteId, userid) {
  return deleteWithId('favorites', favoriteId, userid);
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
  deleteSubmission,
  deleteComment,
  deleteFavorite,
  deleteLike,
};
