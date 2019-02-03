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

  const updatedDate = valuesObj.date || false;

  // check if progress or date is updated
  if (valuesObj.progress || updatedDate) {
    return submissionTxn(updateQuery, userid, {
      update: submissionId,
      updatedDate,
    });
  }

  return db.query(updateQuery);
}

async function submissionTxn(
  subQuery,
  userid,
  { update, remove, updatedDate } = {}
) {
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

    // store date prior to updates
    let previousDate;
    if (updatedDate) {
      const currentSubmission = await client.query(
        `SELECT date FROM submissions WHERE userid = '${userid}' AND id = ${update}`
      );
      previousDate =
        currentSubmission.rows[0] && parseDate(currentSubmission.rows[0].date);
    }

    res = await client.query(subQuery);
    if (!res.rows[0]) {
      const err = new Error(
        'deleteWithId: Unable to delete because row id does not exist, or user does not have permission to modify it.'
      );
      err.code = 'e416';
      throw err;
    }

    const { userchallengeid, progress, date } = res.rows[0];
    const parsedDate = parseDate(date);

    let daysIncrement = 0;

    // updates
    if (parsedDate && previousDate && parsedDate !== previousDate) {
      let duplicates = await client.query(
        `SELECT COUNT(date) AS count FROM submissions WHERE date = '${parsedDate}' AND userid = '${userid}' AND userchallengeid = ${userchallengeid}`
      );

      if (duplicates) {
        duplicates = (duplicates.rows[0] && duplicates.rows[0].count) || 0;
      }

      if (duplicates === '1') {
        // console.log('moved to a brand new date');
        daysIncrement += 1;
      }

      let previousDuplicates = previousDate
        ? await client.query(
            `SELECT COUNT(date) AS count FROM submissions WHERE date = '${previousDate}' AND userid = '${userid}' AND userchallengeid = ${userchallengeid}`
          )
        : 0;

      if (previousDuplicates) {
        previousDuplicates =
          previousDuplicates.rows[0] && previousDuplicates.rows[0].count;
      }

      if (previousDuplicates === '0') {
        // console.log('left a date empty');
        daysIncrement -= 1;
      }
    }

    // deletes & inserts
    if (!update) {
      let duplicates = await client.query(
        `SELECT COUNT(date) AS count FROM submissions WHERE date = '${parsedDate}' AND userid = '${userid}' AND userchallengeid = ${userchallengeid}`
      );

      if (duplicates) {
        duplicates = (duplicates.rows[0] && duplicates.rows[0].count) || 0;
      }

      // delete
      if (duplicates === '0') {
        daysIncrement -= 1;
      }

      // new submission for day
      if (duplicates === '1' && !remove) {
        daysIncrement += 1;
      }
    }

    const progQuery = `
      UPDATE user_challenges
      SET progress = progress ${sign} ${progress - (progressBefore || 0)}
      WHERE id = ${userchallengeid}
      AND userid = '${userid}'
      RETURNING *;
    `;

    let currentUserChallenge = await client.query(progQuery);

    // check if we should update user challenge status

    if (daysIncrement) {
      let status = 'IN_PROGRESS';
      const previousDays = currentUserChallenge.rows[0].days;
      const currentDays = previousDays + daysIncrement;
      if (currentDays >= 100) status = 'COMPLETED';

      const statusQuery = `
      UPDATE user_challenges
      SET days = ${currentDays}, status = '${status}'
      WHERE id = ${userchallengeid}
      RETURNING *;
      `;
      await client.query(statusQuery);
    }

    await client.query('COMMIT');
  } catch (e) {
    console.error('transaction failed');
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

function parseDate(dateString) {
  return new Date(dateString).toLocaleDateString();
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
