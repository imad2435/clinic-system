import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName'); // Retrieve user's name

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName'); // Clear user name on logout
    navigate('/login');
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-accent mb-6">Admin Dashboard</h1>
      <p className="text-lg text-dark mb-4">Welcome, {userName || 'Admin'}! Here you have full control over the system.</p>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
      >
        Logout
      </button>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-dark mb-3">Manage Doctors</h3>
          <p className="text-gray-600">Add, edit, or remove doctor accounts.</p>
          <button className="mt-4 px-4 py-2 bg-accent text-white rounded-lg hover:bg-orange-600">Manage Doctors</button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-dark mb-3">Manage Patients</h3>
          <p className="text-gray-600">Oversee patient registrations and data.</p>
          <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">Manage Patients</button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-dark mb-3">System Analytics</h3>
          <p className="text-gray-600">View overall system statistics and reports.</p>
          <button className="mt-4 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-green-600">View Analytics</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;