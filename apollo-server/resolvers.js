const UUID = require('graphql-type-uuid');

const {
  createUser,
  authenticateUser,
  getUser,
  updateUser,
  deleteUser,
  Users,
} = require('../postgresDb/auth/authHandlers');

const resolvers = {
  UUID,
  Query: {
    user: getUser,
    authUser: authenticateUser,
    users: Users,
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
