 import express from 'express';
import { registerPatient, loginPatient, getPatients } from '../controllers/patient.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// ------------------- Register Patient -------------------
router.post('/register', registerPatient);

// ------------------- Login Patient -------------------
router.post('/login', loginPatient);

// ------------------- Get All Patients (Protected Route) -------------------
router.get('/profile', auth(['Patient']), getPatients);

export default router;
