const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

let JWT_SECRET;
if (process.env.NODE_ENV !== 'production') {
  JWT_SECRET = require('../config').secret;
} else {
  JWT_SECRET = process.env.JWT_SECRET
}

// Create Local strategy
const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy({usernameField: 'email'}, function(email, password, done) {
  // Verify username and password, call done with user if correct
  // otherwise call done with false
  User.findOne({email: email}, function(err, user) {
    if (err) {return done(err);}
    if (!user) {return done(null, false);}

    // compare passwords - is 'password' equal to user.password?
    user.comparePassword(password, function (err, isMatch) {
      if (err) {return done(err);}
      if (!isMatch) {return done(null, false);}

      return done(null, user);
    });
  });
});

// Setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: JWT_SECRET
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // See if user ID in payload exists in database
  // If so, call 'done' with user, otherwise call 'done' without a user obj
  User.findById(payload.sub, function(err, user) {
    if(err) {return done(err, false);}

    if(user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
