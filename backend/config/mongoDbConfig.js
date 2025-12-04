import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoDbConnection = async () => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      console.log('Already connected to MongoDB');
      return;
    }

    // Connection options for better reliability
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
      bufferCommands: false, // Disable mongoose buffering
      maxPoolSize: 10, // Maintain up to 10 socket connections
      retryWrites: true,
      w: 'majority'
    };

    console.log('Attempting to connect to MongoDB...');

    await mongoose.connect(process.env.MONGO_URI, options);
    console.log('✅ Database Connected Successfully');

    // Event listeners for monitoring
    mongoose.connection.on('connected', () => console.log('Mongoose connected to DB'));
    mongoose.connection.on('error', (err) => console.error('❌ Mongoose connection error:', err));
    mongoose.connection.on('disconnected', () => console.log('⚠️ Mongoose disconnected from DB'));

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('Mongoose connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);

    if (error.name === 'MongoNetworkError') {
      console.error('Network error - check your connection string and network access');
    } else if (error.name === 'MongoTimeoutError') {
      console.error('Connection timeout - check your MongoDB cluster whitelist settings');
    } else if (error.name === 'MongoParseError') {
      console.error('Connection string error - check your MONGO_DB_URL format');
    }

    throw error;
  }
};

export default mongoDbConnection;
