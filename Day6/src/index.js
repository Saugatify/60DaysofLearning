import dotenv from 'dotenv';
import { app } from './app.js';
import connectDB from './db/index.js'; 

// Load environment variables from a file named .env
dotenv.config({ path: './env' });

// Connect to the database and start the server
connectDB()
  .then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`⚙️ Server is running at port: ${port}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!!", err);
  });






/*
import express from 'express';
import mongoose from 'mongoose';

const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.on('error', (error) => {
      console.log('ERRR: ', error);
      throw error;
    });

    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  } catch (error) {
    console.error('ERROR: ', error);
    throw error;
  }
})();
*/
