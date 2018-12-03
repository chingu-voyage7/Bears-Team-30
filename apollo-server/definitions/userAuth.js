const { gql } = require('apollo-server');
const db = require('../../postgresDb/index');
const {
  createUser,
  authenticateUser,
  getUser,
  updateUser,
  deleteUser,
  Users,
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
    Users: [UserAuth!]
  }

  type Mutation {
    createUser(data: CreateUserInput!): User!
    updateUser(id: ID!, data: UpdateUserInput!): UserAuth!
    # check which fields updated, if password updated remember
    # to hash new password
    deleteUser(id: ID!): UserAuth!
  }

  type User {
    id: ID!
    username: String
    email: String
    updatedAt: DateTime
    createdAt: DateTime
  }

  type UserAuth {
    id: ID
    username: String
    email: String
    updatedAt: DateTime
    createdAt: DateTime
  }

  type AuthenticationResult {
    isAuthenticated: Boolean!
    id: ID
    username: String
    email: String
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

  scalar DateTime
`;

const resolvers = {
  Query: {
    getUser,
    authenticateUser,
    Users,
  },
  Mutation: {
    createUser,
    updateUser,
    deleteUser,
  },
};

module.exports = { typeDefs, resolvers };
