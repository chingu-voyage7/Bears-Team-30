const { getUser } = require('../../postgresDb/auth/authHelpers');
const {
  insertSubmission,
  insertComment,
  insertFavorite,
  insertLike,
  updateSubmission: updateSubmissionHelper,
  getUserSubmissions,
  getChallengeGroupSubmissions,
  getComments,
  getLikes,
  getFavorites,
  deleteSubmission: deleteSubmissionHelper,
  deleteComment: deleteCommentHelper,
  deleteFavorite: deleteFavoriteHelper,
  deleteLike: deleteLikeHelper,
} = require('../../postgresDb/submissions/submissionsHelpers');
const {
  getUserChallenge,
} = require('../../postgresDb/challenges/challengeHelpers');
const {
  success,
  failure,
  notAuthenticated,
  parseResults,
} = require('./resolverHelpers');

/**
 * returns all of user's submissions for a specific challenge
 * @param {*} userid
 * @param {*} challengid
 */
function submissions(parent, { userChallengeId }, { id }) {
  return getUserSubmissions(
    // { userid: id },
    { userchallengeid: userChallengeId }
  );
}

/**
 * Returns a specific submission
 * @param {*} submissionId
 */
function submission(parent, { submissionId }) {
  return getUserSubmissions({ id: submissionId }, null).then(res => res[0]);
}

// return submissions in a challenge group
function challengeGroupSubmissions(
  parent,
  { challengeGroupId, amount, sortBy, offset }
) {
  // console.log(challengeGroupId, amount, sortBy, offset);

  const selectOrder = function(sortBy) {
    switch (sortBy) {
      case 'NEW':
        return { order: 'created_at DESC' };
      case 'OLD':
        return { order: 'created_at ASC' };
      case 'HOT':
        return {
          order: 'like_count DESC',
          customQuery: `
          SELECT S.*, challengegroupid, COUNT(L.id) AS like_count
          FROM submissions S
          INNER JOIN user_challenges U ON S.userchallengeid = U.id
          LEFT JOIN likes L ON L.submissionid = S.id
          `,
          groupBy: 'GROUP BY S.id, U.challengegroupid',
        };
      case 'FAVE':
        return {
          order: 'fave_count DESC',
          customQuery: `
          SELECT S.*, challengegroupid, COUNT(F.id) AS fave_count
          FROM submissions S
          INNER JOIN user_challenges U ON S.userchallengeid = U.id
          LEFT JOIN favorites F ON F.submissionid = S.id
          `,
          groupBy: 'GROUP BY S.id, U.challengegroupid',
        };
      default:
        return null;
    }
  };

  return getChallengeGroupSubmissions(challengeGroupId, {
    customQuery: `
    SELECT S.*, challengegroupid
    FROM submissions S
    INNER JOIN user_challenges U ON S.userchallengeid = U.id
    `,
    limit: amount,
    offset,
    ...selectOrder(sortBy),
  })
    .then(parseResults)
    .catch(failure);
}

const Submission = {
  user({ userid }) {
    return getUser({ id: userid });
  },
  comments({ id }) {
    return getComments(id);
  },
  likes({ id }) {
    return getLikes(id);
  },
  favorites({ id }) {
    return getFavorites(id);
  },
  userChallenge({ userchallengeid }) {
    return getUserChallenge(userchallengeid);
  },
};

const Comment = {
  creator({ userid }) {
    return getUser({ id: userid });
  },
  submission({ submissionid }) {
    return getUserSubmissions({ id: submissionid }, null).then(res => res[0]);
  },
};

const Like = Comment;

const Favorite = Comment;

/**
 * creates a new submission
 */
function createSubmission(parent, { userChallengeId, data }, { id: userid }) {
  if (notAuthenticated(userid)) return notAuthenticated(userid);

  return insertSubmission({
    userid,
    userchallengeid: userChallengeId,
    ...data,
  })
    .then(res => ({ submission: res }))
    .then(success)
    .catch(failure);
}

/**
 * Updates a submission
 */
function updateSubmission(parent, { submissionId, data }, { id }) {
  if (notAuthenticated(id)) return notAuthenticated(id);

  return updateSubmissionHelper(submissionId, data, id)
    .then(res => ({ submission: res }))
    .then(success)
    .catch(failure);
}

/**
 * Note: Does not currently delete associated comments, favorites, or likes
 * Need to decide if we want to keep those.
 * @param {*} parent
 * @param {*} param1
 * @param {*} param2
 */
function deleteSubmission(parent, { submissionId }, { id }) {
  if (notAuthenticated(id)) return notAuthenticated(id);

  return deleteSubmissionHelper(submissionId, id)
    .then(res => ({ submission: res }))
    .then(success)
    .catch(failure);
}

function createComment(parent, { data: { text, submissionId } }, { id }) {
  if (notAuthenticated(id)) return notAuthenticated(id);

  return insertComment(submissionId, text, id)
    .then(res => ({ comment: res }))
    .then(success)
    .catch(failure);
}

function updateComment(commentId, { data: { text, submissionId } }) {}

function deleteComment(parent, { commentId }, { id }) {
  if (notAuthenticated(id)) return notAuthenticated(id);

  return deleteCommentHelper(commentId, id)
    .then(res => ({ comment: res }))
    .then(success)
    .catch(failure);
}

function createLike(parent, { submissionId }, { id }) {
  if (notAuthenticated(id)) return notAuthenticated(id);

  return insertLike(submissionId, id)
    .then(res => ({ like: res }))
    .then(success)
    .catch(failure);
}

function deleteLike(parent, { likeId }, { id }) {
  if (notAuthenticated(id)) return notAuthenticated(id);

  return deleteLikeHelper(likeId, id)
    .then(res => ({ like: res }))
    .then(success)
    .catch(failure);
}

function createFavorite(parent, { submissionId }, { id }) {
  if (notAuthenticated(id)) return notAuthenticated(id);

  return insertFavorite(submissionId, id)
    .then(res => ({ favorite: res }))
    .then(success)
    .catch(failure);
}

function deleteFavorite(parent, { favoriteId }, { id }) {
  if (notAuthenticated(id)) return notAuthenticated(id);

  return deleteFavoriteHelper(favoriteId, id)
    .then(res => ({ favorite: res }))
    .then(success)
    .catch(failure);
}

module.exports = {
  createSubmission,
  Submission,
  challengeGroupSubmissions,
  submissions,
  submission,
  updateSubmission,
  deleteSubmission,
  createComment,
  updateComment,
  deleteComment,
  createLike,
  deleteLike,
  createFavorite,
  deleteFavorite,
  Comment,
  Like,
  Favorite,
};
