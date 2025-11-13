// server/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'; // <-- Note .js extension

// Import routes
import doctorRoutes from './routes/doctorRoutes.js'; // <-- Note .js extension

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // To accept JSON data in the body

// Mount routers
app.use('/api/doctors', doctorRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));