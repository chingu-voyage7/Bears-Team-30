const { ApolloServer } = require('apollo-server');
const { RedisCache } = require('apollo-server-cache-redis');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  cache: new RedisCache({
    
  }) 
});

server.listen().then(({ url }) => {
  console.log(`Apollo server listening at ${url}`);
});
