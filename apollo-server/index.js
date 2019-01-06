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
  playground: {
    subscriptionEndpoint: 'ws://localhost:4000/graphql',
  },
});

server
  .listen()
  .then(({ url, subscriptionsUrl }) => {
    console.log(`Server listening at ${url}`);
    console.log(`Subscriptions ready at ${subscriptionsUrl}`);
  })
  .catch(err => console.error(err));
