const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: '/auth/facebook/callback',
      passReqToCallback: true,
      profileFields: ['id', 'emails', 'name', 'displayName', 'gender']
    },
    function(req, accessToken, refreshToken, profile, done) {
      const claimType = 'urn:facebook:access_token';

      const findOrCreateFBUser = async () => {
        if (profile) {
          // Look up user by profile id
          let user = await User.findOne({
            where: { facebookId: profile.id }
          });

          // Create a new user in the user table if not found
          if (!user) {
            var newUser = {
              name: profile.displayName,
              // email: profile.emails[0].value,
              profileId: profile.id,
              profileType: profile.provider,
              gender: profile.gender,
              picture: `https://graph.facebook.com/${profile.id}/picture?type=large`,
              claims: [{ type: claimType, value: profile.id }]
            };
            user = await new User({ facebookId: profile.id }).save();
          }

          // Return the user
          // const userWithToken = addJWT(user);
          done(null, user);
        }
      };

      findOrCreateFBUser().catch(done);
    }
  )
);
