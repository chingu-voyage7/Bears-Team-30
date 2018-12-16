const UUID = require('graphql-type-uuid');

const {
  createUser,
  authenticateUser,
  getUser,
  updateUser,
  deleteUser,
  Users,
  me,
} = require('../postgresDb/auth/authHandlers');

const {
  challengeGroups,
  ChallengeGroup,
  createUserChallenge,
  userChallenge,
  challengeGroup,
  myChallenges,
  userChallenges,
  Challenge,
} = require('../postgresDb/challenges/challengeHandlers');

const resolvers = {
  UUID,
  Query: {
    user: getUser,
    authUser: authenticateUser,
    users: Users,
    me,
    challengeGroups,
    challengeGroup,
    userChallenge,
  },
  Mutation: {
    createUser,
    updateUser,
    deleteUser,
    createUserChallenge,
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
