import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

// Middlewares
app.use(express.json())
app.use(cors());
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json("Server is running");
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})