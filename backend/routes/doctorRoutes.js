// server/routes/doctorRoutes.js
import express from 'express';
const router = express.Router();
import { getAllDoctors } from '../controllers/doctorController.js'; // <-- Note .js extension

router.get('/', getAllDoctors);

export default router; // <-- Changed here