import React from 'react';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName'); // Get user's name

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName'); // Clear user name on logout
    navigate('/login');
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-primary mb-6">Patient Dashboard</h1>
      <p className="text-lg text-dark mb-4">Welcome, {userName || 'Patient'}! Here you can manage your appointments.</p>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
      >
        Logout
      </button>

      {/* Placeholder for patient-specific content */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-dark mb-3">Book New Appointment</h3>
          <p className="text-gray-600">Find and schedule appointments with doctors.</p>
          <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">Book Now</button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-dark mb-3">View My Appointments</h3>
          <p className="text-gray-600">Check your upcoming and past appointments.</p>
          <button className="mt-4 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-green-600">View</button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-dark mb-3">Update Profile</h3>
          <p className="text-gray-600">Manage your personal information.</p>
          <button className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;