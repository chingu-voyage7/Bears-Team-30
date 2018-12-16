const {ApolloServer} = require('apollo-server-express');
const express = require('express');
const {RedisCache} = require('apollo-server-cache-redis');
// const cache = new RedisCache({});

const {authDefs, resolvers} = require('./definitions/userAuth');
const ErrorCodes = require('./definitions/errorCodes');


// Load only method to check users form the db
const {checkUsername} = require('../postgresDb/authHelpers');


// Passport variables
const passport = require('passport');
const passportJWT = require("passport-jwt");
const {Strategy, ExtractJwt} = passportJWT

// Secret key key
const {SECRET_ENCRYPT} = process.env;


// Params which are required by Strategy function
const params = {
  secretOrKey: SECRET_ENCRYPT,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};


const app = express();
const path = '/graphql'


/**
 * Main Strategy which will be called when ever a certain route is called
 *
 * @type {JwtStrategy|*}
 */
const strategy = new Strategy(params, async (payload, done) => {
console.log(payload)
  // Checking for valid user
  const user = await checkUsername(payload.username);

  // checking user and returning user object
  if (user) {
    return done(null, {
      id: user
    })
  }

  return done(new Error('The user has not been found'), null)
});


// Applying strategy
passport.use(strategy);

// Starting up passport
passport.initialize();


/**
 * This is important part, was we need to authenticate only the
 * graphql path which will be used by users
 */
app.use(path, function (req, res, next) {

  // Passport Jwt auth, passport will strip jwt token and
  // return the user
  passport.authenticate('jwt', (err, user, info) => {

    // For error
    if (err) {
      res.status(500).send({"error": err});
      return;
    }

    // If user does not exist
    if (!user) {
      res.status(500).send({"error": 'User not actenticated'});
      return;
    }

    // go back to what ever you were doing
    next();

  })(req, res, next);
});



process.on('unhandledRejection', (reason, promise) => {
  console.error(reason, promise);
});


const server = new ApolloServer({
  typeDefs: [authDefs, ErrorCodes],
  resolvers,
});


// Listening to port
app.listen({port: 4000}, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);


/**
 * Having 2 different routes because one is for login without jwt token
 * other route is only to access for auth users
 */
server.applyMiddleware({app, path: '/url'});
server.applyMiddleware({app, path: path});

module.exports = app;
