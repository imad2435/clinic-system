// frontend/src/pages/PatientDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Import the new cancelAppointment function
import { getMyAppointments, getAllDoctors, cancelAppointment } from '../api';
import BookingModal from '../components/BookingModal';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await getMyAppointments();
      setAppointments(data);
    } catch (err) {
      setError('Failed to fetch appointments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    const fetchDoctors = async () => {
      try {
        const doctorsData = await getAllDoctors();
        setDoctors(doctorsData);
      } catch (err) {
        console.error('Failed to fetch doctors:', err);
      }
    };
    fetchDoctors();
  }, []);

  const handleBookingSuccess = () => {
    fetchAppointments();
  };

  // --- NEW: Function to handle appointment cancellation ---
  const handleCancel = async (appointmentId) => {
    // Ask for confirmation before cancelling
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await cancelAppointment(appointmentId);
        // To show the change immediately, we update the state directly
        // instead of re-fetching the whole list from the server.
        setAppointments(prevAppointments =>
          prevAppointments.map(appt =>
            appt._id === appointmentId ? { ...appt, status: 'Cancelled' } : appt
          )
        );
      } catch (err) {
        alert('Failed to cancel appointment. Please try again.');
        console.error(err);
      }
    }
  };
  // --------------------------------------------------------

  return (
    <div className="p-8">
      {isModalOpen && (
        <BookingModal
          doctors={doctors}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleBookingSuccess}
        />
      )}
      <h1 className="text-4xl font-bold text-primary mb-6">Patient Dashboard</h1>
      <p className="text-lg text-dark mb-4">Welcome, {userName || 'Patient'}!</p>

      {/* Booking card */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
        <h3 className="text-xl font-semibold text-dark mb-3">Book New Appointment</h3>
        <p className="text-gray-600">Find and schedule appointments with doctors.</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 px-4 py-2 bg-primary text-black rounded-lg hover:bg-blue-600"
        >
          Book Now
        </button>
      </div>

      {/* My Appointments section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-dark mb-4">My Appointments</h2>
        {loading && <p>Loading your appointments...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            {appointments.length === 0 ? (
              <p>You have no appointments scheduled.</p>
            ) : (
              <ul className="space-y-4">
                {appointments.map((appt) => (
                  <li key={appt._id} className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-bold text-lg">Dr. {appt.doctor.name} ({appt.doctor.specialization})</p>
                      <p>Date: {new Date(appt.appointmentDate).toLocaleDateString()}</p>
                      <p>Reason: {appt.reason}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        appt.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                        appt.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {appt.status}
                      </span>
                      {/* --- NEW: Add Cancel button only for Scheduled appointments --- */}
                      {appt.status === 'Scheduled' && (
                        <button
                          onClick={() => handleCancel(appt._id)}
                          className="px-3 py-1 bg-red-500 text-black text-sm rounded-lg hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      )}
                      {/* ------------------------------------------------------------- */}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;