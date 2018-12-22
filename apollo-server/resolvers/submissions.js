const { getUser } = require('../../postgresDb/auth/authHelpers');
const {
  insertSubmission,
  insertComment,
  insertFavorite,
  insertLike,
  updateSubmission: updateSubmissionHelper,
  getUserSubmissions,
  getComments,
  getLikes,
  getFavorites,
} = require('../../postgresDb/submissions/submissionsHelpers');

// QUERIES:

/**
 * returns all of user's submissions for a specific challenge
 * @param {*} userid
 * @param {*} challengid
 */
function submissions(parent, { userId, userChallengeId }) {
  return getUserSubmissions(
    { userid: userId },
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
};

// MUTATIONS:
/**
 * creates a new submission
 */
async function createSubmission(
  parent,
  { userChallengeId, data },
  { id: userid }
) {
  console.log(userid);
  return await insertSubmission({
    userid,
    userchallengeid: userChallengeId,
    ...data,
  });
}

/**
 * Updates a submission
 */
function updateSubmission(parent, { submissionId, data }) {
  return updateSubmissionHelper(submissionId, data);
}

function deleteSubmission(submissionId) {}

function createComment(parent, { data: { text, submissionId } }, { id }) {
  return insertComment(submissionId, text, id);
}

function updateComment(commentId, { data: { text, submissionId } }) {}

function deleteComment(commentId) {}

function createLike(parent, { submissionId }, { id }) {
  return insertLike(submissionId, id);
}

function deleteLike(likeId) {}

function createFavorite(parent, { submissionId }, { id }) {
  return insertFavorite(submissionId, id);
}

function deleteFavorite(favoriteId) {}

module.exports = {
  createSubmission,
  Submission,
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
};
