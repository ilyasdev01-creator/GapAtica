import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoDbConnection from './config/mongoDbConfig.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json("Server is running");
});

// Wait for DB before starting the server
const startServer = async () => {
  try {
    await mongoDbConnection();  // <-- Await DB connection

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Failed to start server", err);
  }
};

startServer();
