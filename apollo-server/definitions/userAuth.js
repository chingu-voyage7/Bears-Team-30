const { gql } = require('apollo-server');
const db = require('../../postgresDb/index');
const {
  createUser,
  authenticateUser,
  getUser,
} = require('../../postgresDb/authHandlers');

const typeDefs = gql`
  type Query {
    # returns user info
    getUser(id: ID, username: String): User
    
    # Uses either id or email; returns isAuthenticated: Boolean
    authenticateUser(id: ID, email: String, password: String!): AuthenticationResult
  }

  type Mutation {
    createUser(data: CreateUserInput!): User!
    updateUser(userId: ID!, data: UpdateUserInput!): User!
    # check which fields updated, if password updated remember
    # to hash new password
    deleteUser(userId: ID!): User!
  }

  type User {
    id: ID!
    username: String
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
  },
  Mutation: {
    createUser,
    // updateUser() {},
    // deleteUser() {},
  },
};

module.exports = { typeDefs, resolvers };
