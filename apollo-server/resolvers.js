const UUID = require('graphql-type-uuid');

const {
  createUser,
  auth,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  users,
  me,
} = require('./resolvers/auth');

const {
  challengeGroups,
  createUserChallenge,
  userChallenge,
  challengeGroup,
  myChallenges,
  userChallenges,
  Challenge,
  ChallengeGroup,
} = require('./resolvers/challenge');

const resolvers = {
  UUID,
  Query: {
    user: getUser,
    auth,
    users,
    me,
    challengeGroups,
    challengeGroup,
    userChallenge,
    userChallenges,
    myChallenges,
  },
  Mutation: {
    createUser,
    updateUser,
    deleteUser,
    createUserChallenge,
    loginUser,
  },
  MutationResponse: {
    __resolveType() {
      return null;
    },
  },
  ChallengeGroup,
  Challenge,
};

module.exports = resolvers;
