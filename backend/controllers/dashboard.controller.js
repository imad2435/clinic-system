// backend/controllers/dashboard.controller.js
import Doctor from '../models/Doctor.model.js';
import Patient from '../models/Patient.model.js';
import Appointment from '../models/Appointment.model.js';

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private (Admin only)
export const getDashboardStats = async (req, res) => {
    try {
        // We use Promise.all to run these database queries in parallel for better performance
        const [doctorCount, patientCount, appointmentCount] = await Promise.all([
            Doctor.countDocuments(),
            Patient.countDocuments(),
            Appointment.countDocuments()
        ]);

        res.status(200).json({
            doctors: doctorCount,
            patients: patientCount,
            appointments: appointmentCount
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ message: 'Server error while fetching stats.' });
    }
};