const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { RedisCache } = require('apollo-server-cache-redis');
const { typeDefs, resolvers } = require('./definitions/userAuth');

// const cache = new RedisCache({});
const app = express();

process.on('unhandledRejection', (reason, promise) => {
  console.error(reason, promise);
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

module.exports = app;
