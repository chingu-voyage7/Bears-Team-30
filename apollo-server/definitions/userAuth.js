const { gql } = require('apollo-server');
const {
  createUser,
  authenticateUser,
  getUser,
  updateUser,
  deleteUser,
  Users,
  loginUser,
} = require('../../postgresDb/authHandlers');

const authDefs = gql`
  type Query {
    # returns user info
    user(id: ID, username: String): User

    # Uses either id or email; returns isAuthenticated: Boolean
    authUser(id: ID, email: String, password: String!): AuthenticationResult
    
    # Login user
    loginUser(username: String!, password: String!): LoginResult

    # for dev only -- returns all users in db
    users: [User!]
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
  
  type LoginResult {
    token: String
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
    code: ResponseCodes!
    success: Boolean!
    message: String!
  }

  type UserMutationResponse implements MutationResponse {
    code: ResponseCodes!
    success: Boolean!
    message: String!
    token: String
    user: User
  }

  scalar DateTime
`;

const resolvers = {
  Query: {
    user: getUser,
    authUser: authenticateUser,
    loginUser: loginUser,
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

module.exports = { authDefs, resolvers };
