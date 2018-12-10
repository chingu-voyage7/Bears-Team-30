const { ApolloServer } = require('apollo-server');
const { RedisCache } = require('apollo-server-cache-redis');
const { authDefs, resolvers } = require('./definitions/userAuth');
const ErrorCodes = require('./definitions/errorCodes');
// const cache = new RedisCache({});

process.on('unhandledRejection', (reason, promise) => {
  console.error(reason, promise);
});

const server = new ApolloServer({
  typeDefs: [authDefs, ErrorCodes],
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Apollo server listening at ${url}`);
});
