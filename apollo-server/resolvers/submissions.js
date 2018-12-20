// QUERIES:

/**
 * returns all of user's submissions for a specific challenge
 * @param {*} userid
 * @param {*} challengid
 */
function submissions(userid, challengid) {}

/**
 * Returns a specific submission
 * @param {*} submissionId
 */
function submission() {}

// MUTATIONS:
/**
 * creates a new submission
 */
function createSubmission() {}

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
