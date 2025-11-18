// backend/routes/appointment.route.js
import express from 'express';
// Import all five controller functions now
import {
    bookAppointment,
    getMyAppointments,
    cancelAppointment,
    getDoctorSchedule,
    markAsCompleted // <-- Import the new function
} from '../controllers/appointment.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();


// --- Patient Routes ---
router.post('/book', auth(['Patient']), bookAppointment);
router.get('/my', auth(['Patient']), getMyAppointments);
router.put('/:id/cancel', auth(['Patient']), cancelAppointment);


// --- Doctor Routes ---
router.get('/schedule', auth(['Doctor']), getDoctorSchedule);
router.put('/:id/complete', auth(['Doctor']), markAsCompleted); // <-- Add this new route


export default router;