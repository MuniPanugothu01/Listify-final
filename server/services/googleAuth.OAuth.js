require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const { logger } = require("../utils/logger");
const User = require("../models/User");

// ADDED: Validate Google Client ID on initialization
if (!process.env.GOOGLE_CLIENT_ID) {
  console.error("❌ GOOGLE_CLIENT_ID is not configured in environment variables");
  throw new Error("Google authentication not configured");
}

console.log("✅ Google Client ID configured:", process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID.substring(0, 20) + "..." : "NOT FOUND");

// ADDED: Check if Client ID is in correct format
if (process.env.GOOGLE_CLIENT_ID && !process.env.GOOGLE_CLIENT_ID.includes('.apps.googleusercontent.com')) {
  console.warn("⚠️  GOOGLE_CLIENT_ID may not be in correct format");
  console.warn("Expected format: xxx-xxx.apps.googleusercontent.com");
  console.warn("Your format:", process.env.GOOGLE_CLIENT_ID.substring(0, 30) + "...");
}

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleIdToken = async (idToken) => {
  try {
    console.log("🔍 Verifying Google ID token...");
    
    // ADDED: Validate token format
    if (!idToken || typeof idToken !== 'string' || idToken.length < 100) {
      throw new Error("Invalid Google ID Token format - token is too short or malformed");
    }

    console.log("📋 Token length:", idToken.length, "characters");
    console.log("🔑 Using Client ID:", process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID.substring(0, 20) + "..." : "NOT FOUND");

    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error("Invalid Google ID Token - no payload received");
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp < currentTime) {
      throw new Error("Google ID token has expired");
    }

    // ADDED: Better audience mismatch debugging
    if (payload.aud !== process.env.GOOGLE_CLIENT_ID) {
      console.error("❌ Audience mismatch detected!");
      console.error("   Expected:", process.env.GOOGLE_CLIENT_ID);
      console.error("   Received:", payload.aud);
      console.error("   Token issued to:", payload.iss);
      console.error("   User email:", payload.email);
      throw new Error("Invalid audience for Google ID token. Make sure you're using the correct Google Client ID.");
    }
    
    console.log("✅ Google ID token verified successfully", {
      email: payload.email,
      subject: payload.sub,
      issuedTo: payload.aud ? payload.aud.substring(0, 20) + "..." : "unknown",
    });

    return {
      googleId: payload.sub,
      email: payload.email,
      emailVerified: payload.email_verified || false,
      name: payload.name,
      givenName: payload.given_name,
      familyName: payload.family_name,
      picture: payload.picture,
      locale: payload.locale,
    };
  } catch (error) {
    console.error("❌ Google ID token verification failed", {
      error: error.message,
      clientIdConfigured: !!process.env.GOOGLE_CLIENT_ID,
      clientIdLength: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID.length : 0,
      clientIdFormat: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID.includes('.apps.googleusercontent.com') : false
    });
    
    // ADDED: More specific error messages
    let errorMessage = error.message;
    if (error.message.includes('Wrong number of segments')) {
      errorMessage = "Invalid Google token format. The token appears to be malformed.";
    } else if (error.message.includes('Token used too early')) {
      errorMessage = "Google token used too early. Check your server clock.";
    } else if (error.message.includes('audience')) {
      errorMessage = "Google Client ID mismatch. Make sure you're using the correct Client ID from Google Cloud Console.";
    }
    
    throw new Error(`Google authentication failed: ${errorMessage}`);
  }
};

const generateUsernameFromGoogle = (googleUserInfo) => {
  const baseUsername = googleUserInfo.givenName
    ? googleUserInfo.givenName.toLowerCase()
    : googleUserInfo.email.split("@")[0];

  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `${baseUsername}_${randomSuffix}`.substring(0, 30);
};

const findOrCreateGoogleUser = async (googleUserInfo, req = null) => {
  try {
    let user = await User.findOne({
      $or: [
        { googleId: googleUserInfo.googleId },
        { email: googleUserInfo.email },
      ],
    });

    if (user) {
      // User exists, link Google account if not already linked
      if (!user.googleId) {
        user.googleId = googleUserInfo.googleId;
        user.isVerified = true;
        user.provider = 'google';

        if (googleUserInfo.picture && !user.avatar) {
          user.avatar = googleUserInfo.picture;
        }

        await user.save();

        // Add security log if request info available
        if (req && user.addSecurityLog) {
          await user.addSecurityLog(
            "google_account_linked",
            req.ip,
            req.get("user-agent"),
            { source: "google" }
          );
        }

        logger.info("Google account linked to existing user", {
          userId: user._id,
          email: user.email,
        });
      } else {
        // Update profile picture if missing
        if (googleUserInfo.picture && !user.avatar) {
          user.avatar = googleUserInfo.picture;
          await user.save();

          logger.info("Updated profile picture from Google", {
            userId: user._id,
            email: user.email,
          });
        }
      }

      // Update last login
      if (user.updateLastLogin && req) {
        await user.updateLastLogin(req.ip, req.get("user-agent"));
      }

      logger.info("Google user found", {
        userId: user._id,
        email: user.email,
      });

      return { user, isNew: false };
    } else {
      // Create new user
      user = new User({
        googleId: googleUserInfo.googleId,
        email: googleUserInfo.email,
        name: googleUserInfo.name,
        avatar: googleUserInfo.picture,
        isVerified: true,
        provider: "google",
      });

      await user.save();

      logger.info("New Google user created", {
        userId: user._id,
        email: user.email,
        hasProfilePicture: !!googleUserInfo.picture,
      });

      // Add security log
      if (req && user.addSecurityLog) {
        await user.addSecurityLog(
          "account_created",
          req.ip,
          req.get("user-agent"),
          { source: "google" }
        );
      }

      return { user, isNew: true };
    }
  } catch (error) {
    logger.error("Failed to find or create Google user", {
      email: googleUserInfo.email,
      error: error.message,
    });
    throw error;
  }
};

const handleGoogleAuth = async (idToken, req = null) => {
  try {
    console.log("🔄 Starting Google authentication process...");
    const googleUserInfo = await verifyGoogleIdToken(idToken);
    console.log("✅ Google token verified, finding/creating user...");
    const { user, isNew } = await findOrCreateGoogleUser(googleUserInfo, req);
    console.log("✅ Google authentication completed successfully");
    return { user, isNew };
  } catch (error) {
    console.error("❌ Google authentication failed:", error.message);
    logger.error("Google authentication failed", {
      error: error.message,
    });
    throw error;
  }
};

// For backward compatibility
const verifyToken = async (googleToken, req = null) => {
  return await handleGoogleAuth(googleToken, req);
};

module.exports = {
  verifyGoogleIdToken,
  findOrCreateGoogleUser,
  handleGoogleAuth,
  verifyToken, // For backward compatibility
  generateUsernameFromGoogle,
};