const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

const secret = 'B3@rT3@me0';

/**
 * Signup page
 */
router.post('/auth/signup', (req, res) => {

    const {username, email, password} = req.body;

    try {

        let hash = bcrypt.hashSync(password, 10);

        // TODO save user to db

        res.status(200).json({
            username: username,
            email: email,
            passwordHash: hash,
            message: "User Successfully created!"
        });

    } catch (error) {
        res.status(400).json({
            error: error,
        });
    }
});


/**
 * Auth functionality to check user and
 */
passport.use(new LocalStrategy(function (username, password, done) {

        if (username == 'test' && bcrypt.compareSync(password, "$2b$10$IQAo1zCDzm8sSVECHTPaI.CFb7out0zqip01YJvYSFZ9RqWNCpo8y")) {

            return done(null, {username: username});
        } else {

            return done(null, false);
        }
    })
);

/**
 * Login
 */
router.post('/auth/login', (req, res) => {
    passport.authenticate(
        'local',
        {session: false},
        (error, user) => {

            if (error || !user) {
                res.status(400).json({error});
            }

            // Token payload
            const payload = {
                username: user.username
            };

            // Logging in user
            req.login(payload, {session: false}, (error) => {
                if (error) {
                    res.status(400).json({error});
                }

                // Generating token
                const token = jwt.sign(JSON.stringify(payload), secret);
                res.status(200).json({
                    username: user.username,
                    token: token
                });


            });
        }
    )(req, res);
});


/**
 * Auth for protected pages
 */
passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
    },
    function (jwtPayload, cb) {
        //find the user in db if needed
        return cb(null, jwtPayload);
    }
));


/**
 * User profile auth
 * send request with token
 */
router.get('/user/profile',
    passport.authenticate(
        'jwt',
        {session: false}
        ),
    (req, res) => {
        const { user } = req;

        res.status(200).send({ user });
    });


module.exports = router;
