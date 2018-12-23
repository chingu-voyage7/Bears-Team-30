const {
  getChallengeGroups,
  getChallengeGroupUsers,
  getChallengeGroupChallenges,
  getChallengeSubmissions,
  insertUserChallenge,
  getUserChallenge,
  getUserChallenges,
  getMyChallenges,
  getChallengeGroup,
  updateUserChallenge: updateUserChallengeHelper,
} = require('../../postgresDb/challenges/challengeHelpers');
const { getUser } = require('../../postgresDb/auth/authHelpers');
const { cleanProps } = require('../../postgresDb/pgHelpers');
const {
  success,
  failure,
  notAuthenticated,
  parseResults,
} = require('./resolverHelpers');

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
  challenges({ id }) {
    return getChallengeGroupChallenges(id).then(res => {
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

// Mutations:

/**
 * Creates a user_challenges row and returns a challenge
 */
function createUserChallenge(
  parent,
  { data: { challengeId: challengeid, goal, status } },
  { id }
) {
  return insertUserChallenge({ challengeid, goal, status }, id);
}

function updateUserChallenge(parent, { userChallengeId, data }, { id }) {
  if (notAuthenticated(id)) return notAuthenticated(id);

  return updateUserChallengeHelper(userChallengeId, data, id)
    .then(res => ({ challenge: res }))
    .then(success)
    .catch(failure);
}

const Challenge = {
  user({ userid }) {
    return getUser({ id: userid });
  },
  challengeGroup({ challengeid }) {
    return getChallengeGroup(challengeid);
  },
  submissions({ id }) {
    return getChallengeSubmissions(id).then(parseResults);
  },
};

module.exports = {
  challengeGroups,
  challengeGroup,
  userChallenges,
  userChallenge,
  myChallenges,
  createUserChallenge,
  updateUserChallenge,
  Challenge,
  ChallengeGroup,
};
