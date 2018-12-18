const {
  getChallengeGroups,
  getChallengeGroupUsers,
  insertUserChallenge,
  getUserChallenge,
  getUserChallenges,
  getMyChallenges,
  getChallengeGroup,
} = require('../../postgresDb/challenges/challengeHelpers');
const { getUser } = require('../../postgresDb/auth/authHelpers');
const { cleanProps } = require('../../postgresDb/pgHelpers');

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
function challengeGroup(parent, { challengeGroupId }) {
  return getChallengeGroup(challengeGroupId);
}

/**
 * Returns a user's challenges
 */
function userChallenges(parent, { user }) {
  return getUserChallenges(user);
}

/**
 * Returns a specific challenge from a specific user
 */
function userChallenge(parent, { userChallengeId }) {
  return getUserChallenge(userChallengeId);
}

function myChallenges(parent, args, { id }) {
  if (!id) throw new Error('User not logged in.');
  return getMyChallenges(id);
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
    return getUser({ id: userid });
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
  myChallenges,
  submissions,
  submission,
  createUserChallenge,
  Challenge,
  createSubmission,
  updateSubmission,
  ChallengeGroup,
};
