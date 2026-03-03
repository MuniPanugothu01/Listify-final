const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB connection options - REMOVED DEPRECATED OPTIONS
    const options = {
      // REMOVED: useNewUrlParser and useUnifiedTopology (deprecated)
      
      // Keep these valid options:
      ssl: true,
      tls: true,
      tlsAllowInvalidCertificates: process.env.NODE_ENV === 'development',
      retryWrites: true,
      w: 'majority',
      
      // Connection pool settings
      maxPoolSize: 20,              // Increased from 10 for better concurrency
      minPoolSize: 5,               // Increased from 2 to keep warm connections
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      serverSelectionTimeoutMS: 30000,
      heartbeatFrequencyMS: 10000,  // Check server health every 10s
      maxIdleTimeMS: 60000,         // Close idle connections after 60s
      
      // Auto reconnect
      autoIndex: true,
      autoCreate: true,
    };

    console.log('🔄 Connecting to MongoDB...');
    console.log('📊 URI format:', process.env.MONGODB_URI ? '✅ Present' : '❌ Missing');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected — attempting auto-reconnect in 5s...');
      setTimeout(async () => {
        try {
          if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI, options);
            console.log('✅ MongoDB auto-reconnected successfully');
          }
        } catch (reconnectErr) {
          console.error('❌ MongoDB auto-reconnect failed:', reconnectErr.message);
          // Retry again in 10 seconds
          setTimeout(async () => {
            try {
              if (mongoose.connection.readyState === 0) {
                await mongoose.connect(process.env.MONGODB_URI, options);
                console.log('✅ MongoDB reconnected on second attempt');
              }
            } catch (err2) {
              console.error('❌ MongoDB reconnect retry failed:', err2.message);
            }
          }, 10000);
        }
      }, 5000);
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });

    return conn;
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    console.error('\n🔍 DEBUGGING TIPS:');
    console.error('1. Check your MongoDB URI in .env file');
    console.error('2. Make sure your MongoDB Atlas cluster is running');
    console.error('3. Verify your IP is whitelisted in MongoDB Atlas (Network Access)');
    console.error('4. Check if your username/password is correct');
    console.error('5. Ensure the database name exists');
    
    // Don't exit immediately, try to reconnect
    if (process.env.NODE_ENV === 'production') {
      console.log('🔄 Attempting to reconnect in 5 seconds...');
      setTimeout(connectDB, 5000);
    } else {
      // In development, throw to see full error
      throw error;
    }
  }
};

module.exports = connectDB;