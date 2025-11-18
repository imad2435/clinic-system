// backend/controllers/appointment.controller.js
import Appointment from '../models/Appointment.model.js';
import Doctor from '../models/Doctor.model.js';
import Patient from '../models/Patient.model.js';

// @desc    Book a new appointment
// @route   POST /api/appointments/book
// @access  Private (Patient only)
export const bookAppointment = async (req, res) => {
    // ... your existing bookAppointment code is here ...
    // Data from the request body (frontend form)
    const { doctorId, appointmentDate, reason } = req.body;
      
    // The patient's ID is added to req.user by your auth middleware
    const patientId = req.user.id; 

    try {
        // Validation: Ensure all fields are provided
        if (!doctorId || !appointmentDate || !reason) {
            return res.status(400).json({ message: 'Please provide doctor, date, and reason.' });
        }

        // Check if the doctor and patient actually exist in the database
        const doctor = await Doctor.findById(doctorId);
        const patient = await Patient.findById(patientId);

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found.' });
        }
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found.' });
        }

        // Create the new appointment document
        const newAppointment = await Appointment.create({
            patient: patientId,
            doctor: doctorId,
            appointmentDate,
            reason,
        });

        res.status(201).json({
            message: 'Appointment booked successfully!',
            appointment: newAppointment,
        });

    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ message: 'Server error while booking appointment.' });
    }
};

// @desc    Get all appointments for the logged-in patient
// @route   GET /api/appointments/my
// @access  Private (Patient only)
export const getMyAppointments = async (req, res) => {
    const patientId = req.user.id; // Get patient ID from token

    try {
        const appointments = await Appointment.find({ patient: patientId })
            .populate('doctor', 'name specialization') // Get doctor's name and specialization
            .sort({ appointmentDate: 'desc' }); // Show newest appointments first

        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Server error while fetching appointments.' });
    }
};

export const cancelAppointment = async (req, res) => {
    const patientId = req.user.id; // Get patient ID from token
    const { id: appointmentId } = req.params; // Get appointment ID from the URL

    try {
        const appointment = await Appointment.findById(appointmentId);

        // Check 1: Does the appointment exist?
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        // Check 2: Does this appointment belong to the logged-in patient?
        // This is a CRITICAL security check.
        if (appointment.patient.toString() !== patientId) {
            return res.status(401).json({ message: 'Not authorized to cancel this appointment.' });
        }

        // Update the status and save
        appointment.status = 'Cancelled';
        const updatedAppointment = await appointment.save();

        res.status(200).json({
            message: 'Appointment cancelled successfully.',
            appointment: updatedAppointment
        });

    } catch (error) {
        console.error('Error cancelling appointment:', error);
        res.status(500).json({ message: 'Server error while cancelling appointment.' });
    }
};

export const getDoctorSchedule = async (req, res) => {
    const doctorId = req.user.id; // Get doctor ID from token

    try {
        const schedule = await Appointment.find({ doctor: doctorId })
            .populate('patient', 'name email') // Get the patient's name and email
            .sort({ appointmentDate: 'asc' }); // Show upcoming appointments first

        res.status(200).json(schedule);
    } catch (error) {
        console.error('Error fetching doctor schedule:', error);
        res.status(500).json({ message: 'Server error while fetching schedule.' });
    }
};

export const markAsCompleted = async (req, res) => {
    const doctorId = req.user.id; // Get doctor ID from token
    const { id: appointmentId } = req.params; // Get appointment ID from URL

    try {
        const appointment = await Appointment.findById(appointmentId);

        // Check 1: Does the appointment exist?
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        // Check 2: CRITICAL - Is this doctor assigned to this appointment?
        if (appointment.doctor.toString() !== doctorId) {
            return res.status(401).json({ message: 'Not authorized to update this appointment.' });
        }

        // Update the status to 'Completed'
        appointment.status = 'Completed';
        const updatedAppointment = await appointment.save();

        res.status(200).json({
            message: 'Appointment marked as completed.',
            appointment: updatedAppointment
        });

    } catch (error) {
        console.error('Error completing appointment:', error);
        res.status(500).json({ message: 'Server error while completing appointment.' });
    }
};