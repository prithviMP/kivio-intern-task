import express from 'express';
import { config } from 'dotenv';
import paymentRouter from './routes/paymentRoutes.js';
import cors from 'cors';

// Configure environment variables
config({ path: './config/config.env' });

// Create an Express application
export const app = express();

// Middleware to handle CORS
app.use(cors());

// Middleware to parse JSON and urlencoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route handlers
app.use('/api', paymentRouter);

// Endpoint to retrieve the Razorpay API key
app.get('/api/getkey', (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);
