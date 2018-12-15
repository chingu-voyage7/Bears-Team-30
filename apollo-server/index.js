const { ApolloServer } = require('apollo-server');
const { RedisCache } = require('apollo-server-cache-redis');
const authDefs = require('./definitions/userAuth');
const resolvers = require('./resolvers');
const challengeDefs = require('./definitions/challenges');
const ErrorCodes = require('./definitions/errorCodes');
// const cache = new RedisCache({});

process.on('unhandledRejection', (reason, promise) => {
  console.error(reason, promise);
});

const server = new ApolloServer({
  typeDefs: [authDefs, ErrorCodes, challengeDefs],
  resolvers,
  context: ({req})=>{
    const userid = req.headers.authorization;
    return {userid};
  },
});

server.listen().then(({ url }) => {
  console.log(`Apollo server listening at ${url}`);
});
