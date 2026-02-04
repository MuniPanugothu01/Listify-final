require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const { logger } = require("../utils/logger");
const User = require("../models/User");

// ADDED: Validate Google Client ID on initialization
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

// ADDED: Check if Client ID is in correct format
if (
  process.env.GOOGLE_CLIENT_ID &&
  !process.env.GOOGLE_CLIENT_ID.includes(".apps.googleusercontent.com")
) {
  console.warn("⚠️  GOOGLE_CLIENT_ID may not be in correct format");
  console.warn("Expected format: xxx-xxx.apps.googleusercontent.com");
  console.warn(
    "Your format:",
    process.env.GOOGLE_CLIENT_ID.substring(0, 30) + "...",
  );
}

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleIdToken = async (idToken) => {
  try {
    console.log("🔍 Verifying Google ID token...");

    // ADDED: Validate token format
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

    // ADDED: Better audience mismatch debugging
    if (payload.aud !== process.env.GOOGLE_CLIENT_ID) {
      console.error("❌ Audience mismatch detected!");
      console.error("   Expected:", process.env.GOOGLE_CLIENT_ID);
      console.error("   Received:", payload.aud);
      console.error("   Token issued to:", payload.iss);
      console.error("   User email:", payload.email);
      throw new Error(
        "Invalid audience for Google ID token. Make sure you're using the correct Google Client ID.",
      );
    }

    console.log("✅ Google ID token verified successfully", {
      email: payload.email,
      subject: payload.sub,
      picture: payload.picture ? "Yes" : "No",
      issuedTo: payload.aud ? payload.aud.substring(0, 20) + "..." : "unknown",
    });

    return {
      googleId: payload.sub,
      email: payload.email,
      emailVerified: payload.email_verified || false,
      name: payload.name,
      givenName: payload.given_name,
      familyName: payload.family_name,
      picture: payload.picture, // Google profile image URL
      locale: payload.locale,
    };
  } catch (error) {
    console.error("❌ Google ID token verification failed", {
      error: error.message,
      clientIdConfigured: !!process.env.GOOGLE_CLIENT_ID,
      clientIdLength: process.env.GOOGLE_CLIENT_ID
        ? process.env.GOOGLE_CLIENT_ID.length
        : 0,
      clientIdFormat: process.env.GOOGLE_CLIENT_ID
        ? process.env.GOOGLE_CLIENT_ID.includes(".apps.googleusercontent.com")
        : false,
    });

    // ADDED: More specific error messages
    let errorMessage = error.message;
    if (error.message.includes("Wrong number of segments")) {
      errorMessage =
        "Invalid Google token format. The token appears to be malformed.";
    } else if (error.message.includes("Token used too early")) {
      errorMessage = "Google token used too early. Check your server clock.";
    } else if (error.message.includes("audience")) {
      errorMessage =
        "Google Client ID mismatch. Make sure you're using the correct Client ID from Google Cloud Console.";
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

// ==================== UPDATED: findOrCreateGoogleUser FUNCTION ====================
const findOrCreateGoogleUser = async (googleUserInfo, req = null) => {
  try {
    console.log("🔍 Finding or creating Google user...");
    console.log("📝 Google user info:", {
      googleId: googleUserInfo.googleId,
      email: googleUserInfo.email,
      name: googleUserInfo.name,
      hasPicture: !!googleUserInfo.picture,
      pictureUrl: googleUserInfo.picture
        ? googleUserInfo.picture.substring(0, 50) + "..."
        : "No picture",
    });

    let user = await User.findOne({
      $or: [
        { googleId: googleUserInfo.googleId },
        { email: googleUserInfo.email },
      ],
    });

    if (user) {
      console.log("✅ Existing user found:", user.email);

      // User exists, link Google account if not already linked
      if (!user.googleId) {
        console.log("🔗 Linking Google account to existing user");
        user.googleId = googleUserInfo.googleId;
        user.isVerified = true;
        user.provider = "google";

        // Store Google profile image in googleProfileImage field
        if (googleUserInfo.picture) {
          user.googleProfileImage = googleUserInfo.picture;

          // Also update avatar if it's the default or doesn't exist
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

        // Add security log if request info available
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
          hasGoogleProfileImage: !!googleUserInfo.picture,
        });
      } else {
        console.log("🔄 Updating existing Google user");

        // Update Google profile image if available and different from current
        if (googleUserInfo.picture) {
          // Always update googleProfileImage with latest Google picture
          user.googleProfileImage = googleUserInfo.picture;

          // If user hasn't uploaded their own profile image, update avatar too
          if (!user.profileImage) {
            user.avatar = googleUserInfo.picture;
          }

          console.log("📸 Updated Google profile image");
        }

        await user.save();

        logger.info("Updated Google user profile", {
          userId: user._id,
          email: user.email,
          hasProfileImage: !!user.profileImage,
          hasGoogleProfileImage: !!user.googleProfileImage,
        });
      }

      // Update last login
      if (user.updateLastLogin && req) {
        await user.updateLastLogin(req.ip, req.get("user-agent"));
      }

      logger.info("Google user found", {
        userId: user._id,
        email: user.email,
        provider: user.provider,
        hasGoogleProfileImage: !!user.googleProfileImage,
        hasProfileImage: !!user.profileImage,
      });

      return { user, isNew: false };
    } else {
      // Create new user
      console.log("🆕 Creating new Google user");

      user = new User({
        googleId: googleUserInfo.googleId,
        email: googleUserInfo.email,
        name: googleUserInfo.name,
        avatar: googleUserInfo.picture,
        googleProfileImage: googleUserInfo.picture, // Store in dedicated field
        isVerified: true,
        provider: "google",
      });

      await user.save();

      console.log("✅ New Google user created successfully");
      console.log("📊 User details:", {
        id: user._id,
        email: user.email,
        hasGoogleProfileImage: !!user.googleProfileImage,
        avatar: user.avatar ? "Set" : "Not set",
      });

      logger.info("New Google user created", {
        userId: user._id,
        email: user.email,
        hasProfilePicture: !!googleUserInfo.picture,
        googleProfileImageSet: !!user.googleProfileImage,
      });

      // Add security log
      if (req && user.addSecurityLog) {
        await user.addSecurityLog(
          "account_created",
          req.ip,
          req.get("user-agent"),
          {
            source: "google",
            hasGoogleProfileImage: !!googleUserInfo.picture,
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

// ==================== UPDATED: handleGoogleAuth FUNCTION ====================
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
    console.log("📋 Result:", {
      userId: user._id,
      email: user.email,
      isNew: isNew,
      hasGoogleProfileImage: !!user.googleProfileImage,
      hasProfileImage: !!user.profileImage,
      avatar: user.avatar ? "Set" : "Not set",
    });

    return { user, isNew };
  } catch (error) {
    console.error("❌ Google authentication failed:", error.message);
    console.error("🔍 Error details:", error);

    logger.error("Google authentication failed", {
      error: error.message,
      stack: error.stack,
    });

    // Re-throw with more context
    throw new Error(`Google authentication failed: ${error.message}`);
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
