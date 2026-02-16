require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const { logger } = require("../utils/logger");
const User = require("../models/User");

// Validate Google Client ID on initialization
if (!process.env.GOOGLE_CLIENT_ID) {
  console.error(
    "❌ GOOGLE_CLIENT_ID is not configured in environment variables",
  );
  throw new Error("Google authentication not configured");
}

console.log(
  "✅ Google Client ID configured:",
  process.env.GOOGLE_CLIENT_ID
    ? process.env.GOOGLE_CLIENT_ID.substring(0, 20) + "..."
    : "NOT FOUND",
);

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleIdToken = async (idToken) => {
  try {
    console.log("🔍 Verifying Google ID token...");

    if (!idToken || typeof idToken !== "string" || idToken.length < 100) {
      throw new Error(
        "Invalid Google ID Token format - token is too short or malformed",
      );
    }

    console.log("📋 Token length:", idToken.length, "characters");
    console.log(
      "🔑 Using Client ID:",
      process.env.GOOGLE_CLIENT_ID
        ? process.env.GOOGLE_CLIENT_ID.substring(0, 20) + "..."
        : "NOT FOUND",
    );

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

    if (payload.aud !== process.env.GOOGLE_CLIENT_ID) {
      console.error("❌ Audience mismatch detected!");
      throw new Error(
        "Invalid audience for Google ID token. Make sure you're using the correct Google Client ID.",
      );
    }

    console.log("✅ Google ID token verified successfully", {
      email: payload.email,
      subject: payload.sub,
      picture: payload.picture ? "Yes" : "No",
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
    });

    let errorMessage = error.message;
    throw new Error(`Google authentication failed: ${errorMessage}`);
  }
};

// ==================== FIXED: findOrCreateGoogleUser FUNCTION ====================
const findOrCreateGoogleUser = async (googleUserInfo, req = null) => {
  try {
    console.log("🔍 Finding or creating Google user...");
    console.log("📝 Google user info:", {
      googleId: googleUserInfo.googleId,
      email: googleUserInfo.email,
      name: googleUserInfo.name,
      hasPicture: !!googleUserInfo.picture,
    });

    let user = await User.findOne({
      $or: [
        { googleId: googleUserInfo.googleId },
        { email: googleUserInfo.email },
      ],
    });

    if (user) {
      console.log("✅ Existing user found:", user.email);

      if (!user.googleId) {
        console.log("🔗 Linking Google account to existing user");
        user.googleId = googleUserInfo.googleId;
        user.isVerified = true;
        user.provider = "google";

        if (googleUserInfo.picture) {
          user.googleProfileImage = googleUserInfo.picture;
          if (
            !user.avatar ||
            user.avatar.includes(
              "cdn-icons-png.flaticon.com/512/149/149071.png",
            )
          ) {
            user.avatar = googleUserInfo.picture;
          }
        }

        await user.save();

        if (req && user.addSecurityLog) {
          await user.addSecurityLog(
            "google_account_linked",
            req.ip,
            req.get("user-agent"),
            { source: "google" },
          );
        }

        logger.info("Google account linked to existing user", {
          userId: user._id,
          email: user.email,
        });
      } else {
        console.log("🔄 Updating existing Google user");

        if (googleUserInfo.picture) {
          user.googleProfileImage = googleUserInfo.picture;
          if (!user.profileImage) {
            user.avatar = googleUserInfo.picture;
          }
          console.log("📸 Updated Google profile image");
        }

        await user.save();

        logger.info("Updated Google user profile", {
          userId: user._id,
          email: user.email,
        });
      }

      if (user.updateLastLogin && req) {
        await user.updateLastLogin(req.ip, req.get("user-agent"));
      }

      return { user, isNew: false };
    } else {
      console.log("🆕 Creating new Google user");

      user = new User({
        googleId: googleUserInfo.googleId,
        email: googleUserInfo.email,
        name: googleUserInfo.name,
        avatar: googleUserInfo.picture,
        googleProfileImage: googleUserInfo.picture,
        isVerified: true,
        provider: "google",
      });

      await user.save();

      console.log("✅ New Google user created successfully");

      if (req && user.addSecurityLog) {
        await user.addSecurityLog(
          "account_created",
          req.ip,
          req.get("user-agent"),
          {
            source: "google",
          },
        );
      }

      return { user, isNew: true };
    }
  } catch (error) {
    console.error("❌ Failed to find or create Google user:", error);
    logger.error("Failed to find or create Google user", {
      email: googleUserInfo.email,
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
};

// ==================== handleGoogleAuth FUNCTION ====================
const handleGoogleAuth = async (idToken, req = null) => {
  try {
    console.log("🔄 Starting Google authentication process...");
    console.log("🔑 Token received, length:", idToken.length);

    const googleUserInfo = await verifyGoogleIdToken(idToken);

    console.log("✅ Google token verified successfully");
    console.log("👤 User info:", {
      email: googleUserInfo.email,
      name: googleUserInfo.name,
      hasPicture: !!googleUserInfo.picture,
      googleId: googleUserInfo.googleId,
    });

    const { user, isNew } = await findOrCreateGoogleUser(googleUserInfo, req);

    console.log("✅ Google authentication completed successfully");

    return { user, isNew };
  } catch (error) {
    console.error("❌ Google authentication failed:", error.message);
    logger.error("Google authentication failed", {
      error: error.message,
      stack: error.stack,
    });
    throw new Error(`Google authentication failed: ${error.message}`);
  }
};

module.exports = {
  verifyGoogleIdToken,
  findOrCreateGoogleUser,
  handleGoogleAuth,
};