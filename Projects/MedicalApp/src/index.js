import express from 'express';
import connectDB from './db/index.js';
import userRoutes from './routes/user.routes.js';
import dotenv from 'dotenv';

dotenv.config();

// Connect to database
connectDB();

const app = express();
app.use(express.json());

// User routes
app.use('/users', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
