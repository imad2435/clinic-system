import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import { connectDB } from './config/db.js';
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
app.use(cors());

app.use(express.json());
connectDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
