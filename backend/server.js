// server/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Routes
import doctorRoutes from './routes/doctor.route.js';
import patientRoutes from './routes/patient.route.js';
import adminRoutes from './routes/admin.route.js';
import appointmentRoutes from './routes/appointment.route.js'; // <-- 1. IMPORT THIS NEW ROUTE
import dashboardRoutes from './routes/dashboard.route.js';  
// Config
dotenv.config();

// DB connection
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// MiddleWare
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/appointments', appointmentRoutes); // <-- 2. USE THE NEW ROUTE HERE
app.use('/api/dashboard', dashboardRoutes); 
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));