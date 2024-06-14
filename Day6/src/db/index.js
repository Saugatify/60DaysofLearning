import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();  // Load environment variables from .env file

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(" ", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MONGODB connection FAILED: ${error.message}`);
    process.exit(1);
    
  }
};

export default connectDB;
