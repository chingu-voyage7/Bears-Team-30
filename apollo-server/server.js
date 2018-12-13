const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { RedisCache } = require('apollo-server-cache-redis');
const authDefs = require('./definitions/userAuth');
const challengeDefs = require('./definitions/challenges');
const ErrorCodes = require('./definitions/errorCodes');
const resolvers = require('./resolvers');

// const cache = new RedisCache({});
const app = express();

process.on('unhandledRejection', (reason, promise) => {
  console.error(reason, promise);
});

const server = new ApolloServer({
  typeDefs: [authDefs, challengeDefs, ErrorCodes],
  resolvers,
});

server.applyMiddleware({ app });

module.exports = app;
