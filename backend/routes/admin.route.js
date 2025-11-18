import express from 'express';
import { registerAdmin, loginAdmin, getAdmins } from '../controllers/admin.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// ------------------- Register Admin -------------------
router.post('/register', registerAdmin);

// ------------------- Login Admin -------------------
router.post('/login', loginAdmin);

// ------------------- Get All Admins (Protected Route) -------------------
router.get('/profile', auth(['Admin']), getAdmins);

export default router;
