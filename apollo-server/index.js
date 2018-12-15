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
    const token = req.headers.authorization;
    const userid = token || "b594be88-0e94-4aa9-be01-7968bb8d6634";
    return {userid};
  },
});

server.listen().then(({ url }) => {
  console.log(`Apollo server listening at ${url}`);
});
