const { ApolloServer } = require('apollo-server');
const { RedisCache } = require('apollo-server-cache-redis');

const { typeDefs, resolvers } = require('./definitions/userAuth');
// const cache = new RedisCache({});

process.on('unhandledRejection', (reason, promise) => {
  console.error(reason, promise);
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Apollo server listening at ${url}`);
});