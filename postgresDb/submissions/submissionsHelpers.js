const db = require('../index');
const {
  makeQuery,
  makeInsert,
  insert,
  makeUpdateQuery,
  cleanProps,
  getWithId,
  selectWithPagination,
  deleteWithId,
  makeDeleteWithIdQuery,
} = require('../pgHelpers');

function insertSubmission(data, userid) {
  const QUERY = makeInsert('submissions', data);

  return submissionTxn(QUERY, userid);
}

async function updateSubmission(submissionId, valuesObj, userid) {
  const updateQuery = makeUpdateQuery(
    'submissions',
    valuesObj,
    { id: submissionId },
    userid
  );

  // check if progress is update
  if (valuesObj.progress) {
    return submissionTxn(updateQuery, userid, { update: submissionId });
  }

  return db.query(updateQuery);
}

async function submissionTxn(subQuery, userid, { update, remove } = {}) {
  const client = await db.getClient();
  let res;
  try {
    client.query('BEGIN');
    const sign = remove ? '-' : '+';
    let progressBefore = 0;

    // update flag passes submissionId
    if (update) {
      const beforeQuery = `
      SELECT progress FROM submissions
      WHERE id = ${update}
      `;
      progressBefore = await client
        .query(beforeQuery)
        .then(res => res.rows[0].progress);
    }

    res = await client.query(subQuery);
    if (!res.rows[0]) {
      const err = new Error(
        'deleteWithId: Unable to delete because row id does not exist, or user does not have permission to modify it.'
      );
      err.code = 'e416';
      throw err;
    }

    const { userchallengeid, progress } = res.rows[0];

    const progQuery = `
      UPDATE user_challenges
      SET progress = progress ${sign} ${progress - (progressBefore || 0)}
      WHERE id = ${userchallengeid}
      AND userid = '${userid}'
      RETURNING *;
    `;

    await client.query(progQuery);
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
  return res;
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

function getChallengeGroupSubmissions(challengegroupid, paginationOptions) {
  const QUERY = selectWithPagination({ challengegroupid }, paginationOptions);
  return db.query(QUERY);
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
  const QUERY = makeDeleteWithIdQuery('submissions', submissionId, userid);

  return submissionTxn(QUERY, userid, { remove: true });
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
  getChallengeGroupSubmissions,
  getLikes,
  getComments,
  getFavorites,
  updateSubmission,
  deleteSubmission,
  deleteComment,
  deleteFavorite,
  deleteLike,
};
