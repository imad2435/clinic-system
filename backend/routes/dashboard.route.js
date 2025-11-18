// backend/routes/dashboard.route.js
import express from 'express';
import { getDashboardStats } from '../controllers/dashboard.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Route to get all dashboard statistics
// Protected to be accessible only by Admins
router.get('/stats', auth(['Admin']), getDashboardStats);

export default router;