module.exports = function(app) {
  const passport = require('passport');

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(id, cb) {
    cb(null, id);
  });

  return passport;
};
