const { gql } = require('apollo-server');
const UUID = require('graphql-type-uuid');

const {
  createUser,
  auth,
  user,
  updateUser,
  deleteUser,
  users,
  loginUser,
} = require('../resolvers/auth');

const authDefs = gql`
  type Query {
    # returns user info
    user(id: UserIdInput!): User

    # Uses either id or email; returns isAuthenticated: Boolean
    auth: AuthResult!

    # for dev only -- returns all users in db
    users: [User!]
  }

  type Mutation {
    createUser(data: CreateUserInput!): CreateUserMutationResponse!
    loginUser(username: String!, password: String!): LoginResult!

    # check which fields updated, if password updated remember
    # to hash new password
    updateUser(id: UUID!, data: UpdateUserInput!): UpdateUserMutationResponse!
    deleteUser(id: UUID!): UpdateUserMutationResponse!
  }

  type User {
    id: UUID!
    username: String!
    email: String!
    updatedAt: DateTime!
    createdAt: DateTime!
  }

  type AuthResult {
    isAuthenticated: Boolean!
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

  type CreateUserMutationResponse implements MutationResponse {
    code: ResponseCodes!
    success: Boolean!
    message: String!
    token: String
    user: User
  }

  type UpdateUserMutationResponse implements MutationResponse {
    code: ResponseCodes!
    success: Boolean!
    message: String!
    user: User
  }

  scalar DateTime

  scalar UUID
`;

const resolvers = {
  UUID,
  Query: {
    user,
    auth,
    users,
  },
  Mutation: {
    createUser,
    loginUser,
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
