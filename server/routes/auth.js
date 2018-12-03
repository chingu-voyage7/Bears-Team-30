var express = require('express');
var router = express.Router();
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

/**
 * Auth functionality to check user and
 */
passport.use(
  new LocalStrategy(function(username, password, done) {
    if (username == 'test' && password == 'test') {
      return done(null, { username: 'test' });
    } else {
      return done(null, false);
    }
  })
);

/**
 * Creating route for auth, redirecting user on
 */
router.post(
  '/',
  passport.authenticate('local', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/success?username=' + req.user.username);
  }
);

module.exports = router;
