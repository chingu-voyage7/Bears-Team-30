const {
  getChallengeGroups,
  getChallengeGroupUsers,
  insertUserChallenge,
  getUserChallenge,
  getChallengeGroup,
} = require('./challengeHelpers');
const { getUser } = require('../auth/authHelpers');
const { cleanProps } = require('../pgHelpers');

/**
 * Returns all challenge groups
 */
async function challengeGroups() {
  const challengeGroupsData = await getChallengeGroups();

  const challengeGroups = challengeGroupsData.rows;
  const results = [];

  challengeGroups.forEach(challenge => {
    cleanProps(challenge);
    results.push(challenge);
  });

  return results;
}

const ChallengeGroup = {
  users({ id }) {
    const users = getChallengeGroupUsers(id);
    return users.then(res => {
      const usersArr = [];
      res.rows.forEach(user => {
        cleanProps(user);
        usersArr.push(user);
      });
      return usersArr;
    });
  },
};

/**
 * Returns a specific challenge group
 */
function challengeGroup({ id }) {
  return getChallengeGroup(id);
}

/**
 * Returns a user's challenges
 */
function userChallenges() {}

/**
 * Returns a specific challenge from a specific user
 */
function userChallenge(parent, { id }) {
  return getUserChallenge(id);
}

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

// Mutations:

/**
 * Creates a user_challenges row and returns a challenge
 */
function createUserChallenge(
  parent,
  { data: { challengeId: challengeid, goal, status } },
  { userid }
) {
  return insertUserChallenge({ challengeid, goal, status }, userid);
}

const Challenge = {
  user({ userid }) {
    return getUser(userid);
  },
  challengeGroup({ challengeid }) {
    return getChallengeGroup(challengeid);
  },
  // submissions,
};
/**
 * creates a new submission
 */
function createSubmission() {}

/**
 * Updates a submission
 */
function updateSubmission() {}

module.exports = {
  challengeGroups,
  challengeGroup,
  userChallenges,
  userChallenge,
  submissions,
  submission,
  createUserChallenge,
  Challenge,
  createSubmission,
  updateSubmission,
  ChallengeGroup,
};
