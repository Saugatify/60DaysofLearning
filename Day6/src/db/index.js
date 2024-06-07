import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// Debugging log
console.log("DB_NAME:", DB_NAME);
console.log("MONGODB_URI:", process.env.MONGODB_URI);

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongodb connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("MONGODB ERROR:", error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
