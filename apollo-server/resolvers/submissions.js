const { getUser } = require('../../postgresDb/auth/authHelpers');
const {
  insertSubmission,
  getUserSubmissions,
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
  comments({ id }) {},
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
function updateSubmission() {}

function deleteSubmission(submissionId) {}

function createComment({ data: { text, submissionId } }) {}

function updateComment(commentId, { data: { text, submissionId } }) {}

function deleteComment(commentId) {}

function createLike(submissionId) {}

function deleteLike(likeId) {}

function createFavorite(submissionId) {}

function deleteFavorite(favoriteId) {}

module.exports = { createSubmission, Submission, submissions, submission };
