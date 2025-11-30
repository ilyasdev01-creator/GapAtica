import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.POERT || 5000;

app.get('/', (req, res) => {
  res.json("Server is running");
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})