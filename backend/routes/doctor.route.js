import express from 'express';
import { registerDoctor, loginDoctor, getDoctors } from '../controllers/doctor.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// ------------------- Register Doctor -------------------
router.post('/register', registerDoctor);

// ------------------- Login Doctor -------------------
router.post('/login', loginDoctor);

// ------------------- Get All Doctors (Protected Route) -------------------
router.get('/profile', auth(['Doctor']), getDoctors);

export default router;
