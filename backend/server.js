import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import { connectDB } from './config/db.js';
//Routes
import doctorRoutes from './routes/doctor.route.js'
import patientRoutes from './routes/patient.route.js'
import adminRoutes from './routes/admin.route.js'
//Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
//MiddleWare
app.use(cors());
app.use(express.json());
//DB connection
connectDB();
//API Routes
app.use('/api/doctors',doctorRoutes);
app.use('/api/patients',patientRoutes);
app.use('/api/admins', adminRoutes);

app.get('/', (req, res) => {
  res.send('API is running successfully!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
