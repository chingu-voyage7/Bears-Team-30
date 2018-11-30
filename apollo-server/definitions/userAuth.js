const { gql } = require('apollo-server');
const db = require('../../postgresDb/index');
const { selectUser } = require('../../postgresDb/authHelpers');

const typeDef = gql`
  type Query {
    # returns user info
    getUser(id: ID, email: String): User,
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
    username: String!
    email: String!
    # password: String!
    updatedAt: DateTime!
    createdAt: DateTime!
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
`;

const resolvers = {
    Query: {
        getUser(parent,args,context,info){

            return db.query(selectUser(args));
        },
        users: {},
    },
    Mutations: {
        createUser: {},
        updateUser: {},
        deleteUser: {},
    },
}

module.exports = { typeDef, resolvers };
