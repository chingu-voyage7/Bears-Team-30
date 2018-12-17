const { gql } = require('apollo-server');
const UUID = require('graphql-type-uuid');

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
    user(id: UserIdInput!): User

    # Uses either id or email; returns isAuthenticated: Boolean
    authUser(id: UserIdInput!, password: String!): AuthenticationResult

    # Login user
    loginUser(username: String!, password: String!): LoginResult

    # for dev only -- returns all users in db
    users: [User!]
  }

  type Mutation {
    createUser(data: CreateUserInput!): UserMutationResponse!
    # check which fields updated, if password updated remember
    # to hash new password
    updateUser(id: UUID!, data: UpdateUserInput!): UserMutationResponse!
    deleteUser(id: UUID!): UserMutationResponse!
  }

  type User {
    id: UUID!
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

  input UserIdInput {
    id: UUID
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

  scalar UUID
`;

const resolvers = {
  UUID,
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
