const { ApolloServer } = require('apollo-server');
const { RedisCache } = require('apollo-server-cache-redis');

const { typeDefs, resolvers } = require('./definitions/userAuth');
// const cache = new RedisCache({});


// test data:
// const typeDefs = require('./typeDefs');
// const { users } = require('./testData');
// const resolvers = {
//   Query: {
//     users: () => users,
//   },
// };

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Apollo server listening at ${url}`);
});
