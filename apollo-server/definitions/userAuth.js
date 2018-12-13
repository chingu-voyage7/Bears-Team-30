const { gql } = require('apollo-server');

const authDefs = gql`
  type Query {
    # returns user info
    user(id: UserIdInput!): User

    # Uses either id or email; returns isAuthenticated: Boolean
    authUser(id: UserIdInput!, password: String!): AuthenticationResult

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
    user: User
  }

  scalar DateTime

  scalar UUID
`;

module.exports = authDefs;
