const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controllers/userController");
const localLogin = passport.use(new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

var GitHubStrategy = require('passport-github').Strategy;


const githubLogin = passport.use(new GitHubStrategy({
  clientID: '10bba9b58f7d8e80fab3eefd02cdd789afb054de',
  clientSecret: '80124fd7916c1e328027',
  callbackURL: "http://127.0.0.1:8000/auth/github/callback"
},  function(accessToken, refreshToken, profile, cb) {
  const user = userController.getUserById(profile.id);
  return user
  ? cb(null,user)
  : cb(null, false, {
    message:"invalid",
  });
  }))
module.exports = passport.use(localLogin, githubLogin);
