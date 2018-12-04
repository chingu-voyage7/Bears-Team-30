const { gql } = require('apollo-server');
const {
  createUser,
  authenticateUser,
  getUser,
  updateUser,
  deleteUser,
  Users,
  test,
} = require('../../postgresDb/authHandlers');

const typeDefs = gql`
  type Query {
    # returns user info
    getUser(id: ID, username: String): User

    # Uses either id or email; returns isAuthenticated: Boolean
    authenticateUser(
      id: ID
      email: String
      password: String!
    ): AuthenticationResult

    # for testing purposes
    Users: [User!]

    test(value: String!): User
  }

  type Mutation {
    createUser(data: CreateUserInput!): UserMutationResponse!
    # check which fields updated, if password updated remember
    # to hash new password
    updateUser(id: ID!, data: UpdateUserInput!): UserMutationResponse!
    deleteUser(id: ID!): UserMutationResponse!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    updatedAt: DateTime!
    createdAt: DateTime!
  }

  type AuthenticationResult {
    isAuthenticated: Boolean!
    user: User
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    username: String
    email: String
    password: String
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type UserMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
  }

  scalar DateTime
`;

const resolvers = {
  Query: {
    getUser,
    authenticateUser,
    Users,
    test,
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

module.exports = { typeDefs, resolvers };
