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
  startUserChallenge,
  myChallenges,
  userChallenges,
} = require('../postgresDb/challenges/challengeHandlers');

const resolvers = {
  UUID,
  Query: {
    user: getUser,
    authUser: authenticateUser,
    users: Users,
    me,
  },
  Mutation: {
    createUser,
    updateUser,
    deleteUser,
  },
  MutationResponse: {
    __resolveType() {
      return null;
    },
  },
};

module.exports = resolvers;
