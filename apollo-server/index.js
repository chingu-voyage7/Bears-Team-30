const { ApolloServer } = require('apollo-server');
const redis = require('redis');

const authDefs = require('./definitions/userAuth');
const submissionDefs = require('./definitions/submissions');
const resolvers = require('./resolvers');
const challengeDefs = require('./definitions/challenges');
const ErrorCodes = require('./definitions/errorCodes');
const { getUserId } = require('../postgresDb/auth/authHelpers');

// const memClient = redis.createClient({
//   host: process.env.REDISHOST,
//   port: process.env.REDISPORT,
//   password: process.env.REDISKEY,
// });
// memClient.on('error', e => {
//   console.error('Redis error:', e);
// });

process.on('unhandledRejection', (reason, promise) => {
  console.error('uhoh');
  console.error(reason, promise);
});

const server = new ApolloServer({
  typeDefs: [authDefs, ErrorCodes, challengeDefs, submissionDefs],
  resolvers,
  // cache: memClient,
  subscriptions: {
    onConnect: (connectionParams, webSocket) => {
      console.log('connecting');
      if (connectionParams.authToken || connectionParams.authorization) {
        const token =
          connectionParams.authToken ||
          connectionParams.authorization.replace('Bearer ', '');
        id = getUserId(token);
        return { id };
      }
      throw new Error('Missing auth token.');
    },
    onDisconnect: () => {
      console.log('disconnect and cleanup');
    },
    onOperation: (message, params, webSocket) => {
      console.log('operating');
      console.log(arguments);
    },
  },
  context: ({ req, connection }) => {
    if (connection) {
      // console.log('connection', connection);
      return connection.context;
    }

    const authorization = req.headers.authorization || '';
    let id = null;
    if (authorization) {
      const token = authorization.replace('Bearer ', '');
      id = getUserId(token);
    }
    return { id };
  },
  introspection: true,
  playground: process.env.NODE_ENV !== 'production',
  playground: {
    endpoint: 'https://hundred-day-journey.appspot.com',
    subscriptionEndpoint: 'ws://localhost:4000/graphql',
  },
});

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url, subscriptionsUrl }) => {
    console.log('environment:', process.env.NODE_ENV);
    console.log(`Server listening at ${url}`);
    console.log(`Subscriptions ready at ${subscriptionsUrl}`);
  })
  .catch(err => console.error(err));
