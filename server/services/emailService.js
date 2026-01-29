require("dotenv").config();
const nodemailer = require("nodemailer");

// Create transporter
function createTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error(
      "Email credentials missing. Add EMAIL_USER and EMAIL_PASSWORD to .env file",
    );
  }

  console.log("🔧 Creating email transporter with:", process.env.EMAIL_USER);

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

// OTP Email Template
function getOTPEmailTemplate(username, otpCode) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { 
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
        line-height: 1.6; 
        color: #333; 
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
      }
      .container { 
        max-width: 600px; 
        margin: 0 auto; 
        padding: 0;
        background: white;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      .header { 
        background: linear-gradient(135deg, #27bb97 0%, #1fa987 100%); 
        color: white; 
        padding: 40px 20px; 
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 28px;
        font-weight: 600;
      }
      .content { 
        padding: 40px; 
        background: #ffffff;
      }
      .otp-container {
        text-align: center;
        margin: 30px 0;
      }
      .otp-code { 
        background: #27bb97; 
        color: white; 
        padding: 20px; 
        font-size: 32px; 
        font-weight: bold; 
        text-align: center; 
        letter-spacing: 8px;
        border-radius: 8px;
        margin: 20px auto;
        display: inline-block;
        min-width: 200px;
        box-shadow: 0 4px 15px rgba(39, 187, 151, 0.3);
      }
      .security-note { 
        background: #fff8e1; 
        padding: 20px; 
        border-left: 4px solid #ffc107;
        border-radius: 4px;
        margin: 30px 0;
        font-size: 14px;
      }
      .security-note h3 {
        color: #d97706;
        margin-top: 0;
      }
      .footer { 
        text-align: center; 
        padding: 20px; 
        color: #666;
        font-size: 12px;
        border-top: 1px solid #eee;
        background: #f9f9f9;
      }
      .brand {
        font-weight: bold;
        color: #27bb97;
        font-size: 18px;
        margin-bottom: 10px;
      }
      .expiry {
        color: #666;
        font-style: italic;
        margin: 10px 0;
      }
      @media only screen and (max-width: 600px) {
        .content { padding: 20px; }
        .otp-code { font-size: 24px; letter-spacing: 5px; }
        .header { padding: 30px 15px; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Verify Your Email</h1>
      </div>
      <div class="content">
        <div class="brand">Listify</div>
        <h2 style="color: #333; margin-bottom: 20px;">Hello ${username}!</h2>
        <p style="font-size: 16px; color: #555; margin-bottom: 25px;">
          Welcome to Listify! Use the OTP below to complete your registration.
        </p>
        
        <div class="otp-container">
          <p style="margin-bottom: 15px; color: #666;">Your One-Time Password:</p>
          <div class="otp-code">${otpCode}</div>
          <p class="expiry">⏰ Expires in 10 minutes</p>
        </div>
        
        <div class="security-note">
          <h3>🔒 Security Notice:</h3>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Never share this code with anyone</li>
            <li>Our team will never ask for your OTP</li>
            <li>This code can only be used once</li>
          </ul>
        </div>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Listify. All rights reserved.</p>
        <p>Edit Smarter. Export Faster. Create Anywhere.</p>
      </div>
    </div>
  </body>
  </html>
  `;
}

// Send OTP Email - REAL EMAILS ONLY
async function sendOTPEmail(email, username, otp) {
  try {
    console.log(`📤 Attempting to send OTP email to: ${email}`);

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || `"Listify" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Listify Verification Code",
      html: getOTPEmailTemplate(username, otp),
    };

    console.log(
      `📧 Email details: From ${mailOptions.from}, To ${email}, OTP: ${otp}`,
    );

    const result = await transporter.sendMail(mailOptions);

    console.log(`✅ Email sent successfully! Message ID: ${result.messageId}`);
    console.log(`📨 Response: ${result.response}`);

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.error("❌ ERROR sending email:", error.message);

    // If it's an authentication error, give specific advice
    if (
      error.message.includes("Invalid login") ||
      error.message.includes("Authentication failed")
    ) {
      console.error("🔑 Gmail Authentication Failed! Please check:");
      console.error("1. EMAIL_USER in .env: " + process.env.EMAIL_USER);
      console.error("2. Use App Password (not regular password)");
      console.error(
        "3. Enable 2FA and generate App Password at: https://myaccount.google.com/apppasswords",
      );
    }

    throw error;
  }
}

// Add this function to your existing emailServices.js file
const getForgotPasswordOTPTemplate = (username, otpCode) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { 
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
        line-height: 1.6; 
        color: #333; 
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
      }
      .container { 
        max-width: 600px; 
        margin: 0 auto; 
        padding: 0;
        background: white;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      .header { 
        background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%); 
        color: white; 
        padding: 40px 20px; 
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 28px;
        font-weight: 600;
      }
      .content { 
        padding: 40px; 
        background: #ffffff;
      }
      .otp-container {
        text-align: center;
        margin: 30px 0;
      }
      .otp-code { 
        background: #DC2626; 
        color: white; 
        padding: 20px; 
        font-size: 32px; 
        font-weight: bold; 
        text-align: center; 
        letter-spacing: 8px;
        border-radius: 8px;
        margin: 20px auto;
        display: inline-block;
        min-width: 200px;
        box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
      }
      .security-note { 
        background: #fff8e1; 
        padding: 20px; 
        border-left: 4px solid #ffc107;
        border-radius: 4px;
        margin: 30px 0;
        font-size: 14px;
      }
      .security-note h3 {
        color: #d97706;
        margin-top: 0;
      }
      .footer { 
        text-align: center; 
        padding: 20px; 
        color: #666;
        font-size: 12px;
        border-top: 1px solid #eee;
        background: #f9f9f9;
      }
      .brand {
        font-weight: bold;
        color: #27bb97;
        font-size: 18px;
        margin-bottom: 10px;
      }
      .expiry {
        color: #666;
        font-style: italic;
        margin: 10px 0;
      }
      .reset-instruction {
        background: #f0f9ff;
        padding: 20px;
        border-radius: 8px;
        margin: 20px 0;
        border-left: 4px solid #0ea5e9;
      }
      @media only screen and (max-width: 600px) {
        .content { padding: 20px; }
        .otp-code { font-size: 24px; letter-spacing: 5px; }
        .header { padding: 30px 15px; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Reset Your Password</h1>
      </div>
      <div class="content">
        <div class="brand">Listify</div>
        <h2 style="color: #333; margin-bottom: 20px;">Hello ${username}!</h2>
        <p style="font-size: 16px; color: #555; margin-bottom: 25px;">
          We received a request to reset your password for your Listify account.
          Use the OTP below to verify your identity and reset your password.
        </p>
        
        <div class="otp-container">
          <p style="margin-bottom: 15px; color: #666;">Your Password Reset OTP:</p>
          <div class="otp-code">${otpCode}</div>
          <p class="expiry">⏰ Expires in 10 minutes</p>
        </div>
        
        <div class="reset-instruction">
          <h3 style="color: #0ea5e9; margin-top: 0;">Instructions:</h3>
          <p style="margin: 10px 0;">
            1. Enter this OTP in the password reset page<br>
            2. Create a new secure password<br>
            3. Login with your new password
          </p>
        </div>
        
        <div class="security-note">
          <h3>🔒 Security Notice:</h3>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Never share this code with anyone</li>
            <li>Our team will never ask for your OTP</li>
            <li>If you didn't request this, please secure your account</li>
            <li>This code can only be used once</li>
          </ul>
        </div>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Listify. All rights reserved.</p>
        <p>Edit Smarter. Export Faster. Create Anywhere.</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

// Add this function to send forgot password OTP
async function sendForgotPasswordOTPEmail(email, username, otp) {
  try {
    console.log(`📤 Attempting to send forgot password OTP email to: ${email}`);

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || `"Listify" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset OTP - Listify",
      html: getForgotPasswordOTPTemplate(username, otp),
    };

    console.log(
      `📧 Forgot password email details: From ${mailOptions.from}, To ${email}, OTP: ${otp}`,
    );

    const result = await transporter.sendMail(mailOptions);

    console.log(
      `✅ Forgot password OTP email sent successfully! Message ID: ${result.messageId}`,
    );
    console.log(`📨 Response: ${result.response}`);

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.error("❌ ERROR sending forgot password OTP email:", error.message);

    if (
      error.message.includes("Invalid login") ||
      error.message.includes("Authentication failed")
    ) {
      console.error("🔑 Gmail Authentication Failed! Please check:");
      console.error("1. EMAIL_USER in .env: " + process.env.EMAIL_USER);
      console.error("2. Use App Password (not regular password)");
      console.error(
        "3. Enable 2FA and generate App Password at: https://myaccount.google.com/apppasswords",
      );
    }

    throw error;
  }
}

// Add password reset success email
async function sendPasswordResetSuccessEmail(email, username) {
  try {
    console.log(`📤 Sending password reset success email to: ${email}`);

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || `"Listify" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Successful - Listify",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 0;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header { 
            background: linear-gradient(135deg, #10B981 0%, #059669 100%); 
            color: white; 
            padding: 40px 20px; 
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
          }
          .content { 
            padding: 40px; 
            background: #ffffff;
          }
          .success-icon {
            text-align: center;
            margin: 20px 0;
          }
          .footer { 
            text-align: center; 
            padding: 20px; 
            color: #666;
            font-size: 12px;
            border-top: 1px solid #eee;
            background: #f9f9f9;
          }
          .brand {
            font-weight: bold;
            color: #27bb97;
            font-size: 18px;
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Successful</h1>
          </div>
          <div class="content">
            <div class="brand">Listify</div>
            <h2 style="color: #333; margin-bottom: 20px;">Hello ${username}!</h2>
            <p style="font-size: 16px; color: #555; margin-bottom: 25px;">
              Your password has been successfully reset. You can now log in to your Listify account using your new password.
            </p>
            
            <div class="success-icon">
              <div style="width: 80px; height: 80px; background: #10B981; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
              <h3 style="color: #0ea5e9; margin-top: 0;">Security Tips:</h3>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Use a strong, unique password</li>
                <li>Don't share your password with anyone</li>
                <li>Enable two-factor authentication if available</li>
                <li>Log out from shared devices</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/signin" style="display: inline-block; background: #27bb97; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                Login to Your Account
              </a>
            </div>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Listify. All rights reserved.</p>
            <p>Edit Smarter. Export Faster. Create Anywhere.</p>
          </div>
        </div>
      </body>
      </html>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    console.log(
      `✅ Password reset success email sent successfully to ${email}`,
    );

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.error("❌ ERROR sending password reset success email:", error.message);
    throw error;
  }
}

module.exports = {
  sendOTPEmail,
  sendForgotPasswordOTPEmail,
  sendPasswordResetSuccessEmail,
};