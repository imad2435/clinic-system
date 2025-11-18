// frontend/src/pages/DoctorDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Import the new markAsCompleted function
import { getDoctorSchedule, markAsCompleted } from '../api';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');

  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await getDoctorSchedule();
        setSchedule(data);
      } catch (err) {
        setError('Failed to fetch schedule.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, []);

  // --- NEW: Function to handle marking an appointment as completed ---
  const handleComplete = async (appointmentId) => {
    if (window.confirm('Are you sure you want to mark this appointment as completed?')) {
      try {
        await markAsCompleted(appointmentId);
        // Update the status in the local state for an immediate UI change
        setSchedule(prevSchedule =>
          prevSchedule.map(appt =>
            appt._id === appointmentId ? { ...appt, status: 'Completed' } : appt
          )
        );
      } catch (err) {
        alert('Failed to update appointment status. Please try again.');
        console.error(err);
      }
    }
  };
  // ----------------------------------------------------------------

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-secondary mb-6">Doctor Dashboard</h1>
      <p className="text-lg text-dark mb-4">Welcome, {userName || 'Doctor'}! Here is your schedule.</p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-dark mb-4">My Schedule</h2>

        {loading && <p>Loading your schedule...</p>}
        {error && <p className="text-red-500">{error}</p>}
        
        {!loading && !error && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            {schedule.length === 0 ? (
              <p>You have no appointments in your schedule.</p>
            ) : (
              <ul className="space-y-4">
                {schedule.map((appt) => (
                  <li key={appt._id} className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-bold text-lg">Patient: {appt.patient.name}</p>
                      <p>Date: {new Date(appt.appointmentDate).toLocaleString()}</p>
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
                      {/* --- NEW: Add Complete button only for Scheduled appointments --- */}
                      {appt.status === 'Scheduled' && (
                        <button
                          onClick={() => handleComplete(appt._id)}
                          className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"
                        >
                          Complete
                        </button>
                      )}
                      {/* ----------------------------------------------------------------- */}
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

export default DoctorDashboard;