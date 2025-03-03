import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './Config/connectdb.js';
import UserRouter from './Router/User_route.js';

dotenv.config();
const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL // Check the spelling in your .env file
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev")); // ✅ Fixed logging format
app.use(helmet({
    crossOriginResourcePolicy: false
}));

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.json({
        message: `Server is running on port ${PORT}`
    });
});

app.use('/api/user',UserRouter);

connectDB()
  .then(() => {
      app.listen(PORT, () => {
          console.log(`Server is Running on port ${PORT}`);
      });
  })
  .catch((err) => {
      console.error("Database connection failed", err);
      process.exit(1);
  });
