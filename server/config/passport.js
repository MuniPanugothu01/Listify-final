const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
const { logger } = require("../utils/logger");

// JWT Strategy for protecting routes
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      logger.error("JWT Strategy Error:", error);
      return done(error, false);
    }
  }),
);

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        logger.info("Google OAuth Profile:", {
          id: profile.id,
          email: profile.emails?.[0]?.value,
          name: profile.displayName,
        });

        // Check if user exists by googleId
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          // Update last login
          await user.updateLastLogin();
          logger.info("Google user found and updated:", user.email);
          return done(null, user);
        }

        // Check if user exists by email (for merging accounts)
        const email = profile.emails?.[0]?.value;
        if (email) {
          user = await User.findOne({ email });

          if (user) {
            // Merge Google account with existing local account
            user.googleId = profile.id;
            user.provider = "google";
            user.isVerified = true;
            user.avatar = profile.photos?.[0]?.value;
            await user.save();

            logger.info(
              "Google account merged with existing user:",
              user.email,
            );
            return done(null, user);
          }
        }

        // Create new user
        user = await User.create({
          googleId: profile.id,
          email: profile.emails?.[0]?.value,
          name: profile.displayName,
          provider: "google",
          isVerified: true,
          avatar: profile.photos?.[0]?.value,
          password: null, // No password for Google users
        });

        logger.info("New Google user created:", user.email);
        return done(null, user);
      } catch (error) {
        logger.error("Google Strategy Error:", error);
        return done(error, null);
      }
    },
  ),
);

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
