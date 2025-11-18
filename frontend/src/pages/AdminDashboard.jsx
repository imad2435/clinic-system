// frontend/src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react'; // <-- Import hooks
import { useNavigate } from 'react-router-dom';
import { getDashboardStats } from '../api'; // <-- Import our new API function

const AdminDashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');

  // --- NEW: State for stats, loading, and errors ---
  const [stats, setStats] = useState({ doctors: 0, patients: 0, appointments: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // ---------------------------------------------------

  // --- NEW: useEffect to fetch stats on component load ---
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        setError('Failed to fetch dashboard statistics.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []); // Runs once on mount
  // ------------------------------------------------------

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-accent mb-6">Admin Dashboard</h1>
      <p className="text-lg text-dark mb-4">Welcome, {userName || 'Admin'}!</p>

      {/* --- NEW: Display loading, error, or stats cards --- */}
      {loading && <p>Loading statistics...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Doctors Card */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-dark mb-3">Total Doctors</h3>
            <p className="text-5xl font-bold text-accent">{stats.doctors}</p>
          </div>
          {/* Total Patients Card */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-dark mb-3">Total Patients</h3>
            <p className="text-5xl font-bold text-primary">{stats.patients}</p>
          </div>
          {/* Total Appointments Card */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-dark mb-3">Total Appointments</h3>
            <p className="text-5xl font-bold text-secondary">{stats.appointments}</p>
          </div>
        </div>
      )}
      {/* ---------------------------------------------------- */}

    </div>
  );
};

export default AdminDashboard;