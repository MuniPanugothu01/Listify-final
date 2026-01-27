require("dotenv").config();
const nodemailer = require("nodemailer");

// Create transporter
function createTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error('Email credentials missing. Add EMAIL_USER and EMAIL_PASSWORD to .env file');
  }

  console.log('🔧 Creating email transporter with:', process.env.EMAIL_USER);
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
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
      subject: 'Your Listify Verification Code',
      html: getOTPEmailTemplate(username, otp),
    };

    console.log(`📧 Email details: From ${mailOptions.from}, To ${email}, OTP: ${otp}`);
    
    const result = await transporter.sendMail(mailOptions);
    
    console.log(`✅ Email sent successfully! Message ID: ${result.messageId}`);
    console.log(`📨 Response: ${result.response}`);
    
    return { 
      success: true, 
      messageId: result.messageId 
    };
  } catch (error) {
    console.error('❌ ERROR sending email:', error.message);
    
    // If it's an authentication error, give specific advice
    if (error.message.includes('Invalid login') || error.message.includes('Authentication failed')) {
      console.error('🔑 Gmail Authentication Failed! Please check:');
      console.error('1. EMAIL_USER in .env: ' + process.env.EMAIL_USER);
      console.error('2. Use App Password (not regular password)');
      console.error('3. Enable 2FA and generate App Password at: https://myaccount.google.com/apppasswords');
    }
    
    throw error;
  }
}

module.exports = {
  sendOTPEmail
};