const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Load User model
const User = require("../models/User");


passport.use(
  new LocalStrategy((username, password, done) => {
    // Match user
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { msg: "That email is not registered"});
      }
      if (!user.validPassword(password)) {
        return done(null, false, { msg: "Incorrect password"});
      }
      
      return done(null, user);
    })
  })
);


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});



module.exports = passport;