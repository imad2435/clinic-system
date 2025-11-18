import express from 'express';
import { registerDoctor, loginDoctor, getDoctors } from '../controllers/doctor.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// ------------------- Register Doctor -------------------
router.post('/register', registerDoctor);

// ------------------- Login Doctor -------------------
router.post('/login', loginDoctor);

// ------------------- Get All Doctors (Protected Route) -------------------
// Allow both Doctors and Patients to see the list of doctors
router.get('/profile', auth(['Doctor', 'Patient']), getDoctors);
export default router;
