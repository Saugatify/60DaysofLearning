import { config } from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables from .env file (automatically looks for .env in current directory)
config();

const connectDB = async () => {
  const mongoURI = `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PW}@${process.env.MONGO_ATLAS_HOST}/${process.env.MONGO_ATLAS_DB}?retryWrites=true&w=majority`;
  
  try {
    const conn = await mongoose.connect(mongoURI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`${conn.connection.host}`);
  } catch (error) {
    console.error(`MONGODB connection FAILED: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
