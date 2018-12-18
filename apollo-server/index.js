const { ApolloServer } = require('apollo-server');
const { RedisCache } = require('apollo-server-cache-redis');
const authDefs = require('./definitions/userAuth');
const submissionDefs = require('./definitions/submissions');
const resolvers = require('./resolvers');
const challengeDefs = require('./definitions/challenges');
const ErrorCodes = require('./definitions/errorCodes');
const { getUserId } = require('../postgresDb/auth/authHelpers');
// const cache = new RedisCache({});

process.on('unhandledRejection', (reason, promise) => {
  console.error(reason, promise);
});

const server = new ApolloServer({
  typeDefs: [authDefs, ErrorCodes, challengeDefs, submissionDefs],
  resolvers,
  context: ({ req }) => {
    const authorization = req.headers.authorization || '';
    const token = authorization.replace('Bearer ', '');
    const id = getUserId(token);
    return { id };
  },
});

server.listen().then(({ url }) => {
  console.log(`Apollo server listening at ${url}`);
});
