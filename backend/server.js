import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoDbConnection from './config/mongoDbConfig.js';
import userRoute from './routes/userRoutes.js';
import googleRoute from './routes/googleRoutes.js';
import githubRoute from './routes/githubRoutes.js';
import meetingRoute from './routes/meetingRoutes.js';
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Routes
app.get('/', (req, res) => {
  res.json("Server is running");
});
app.use('/api', userRoute);
app.use('/api', googleRoute);
app.use('/api', githubRoute);
app.use('/api', meetingRoute)

const startServer = async () => {
  try {
    await mongoDbConnection();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Failed to start server", err);
  }
};

startServer();
