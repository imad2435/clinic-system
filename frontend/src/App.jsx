//--- File: clinic-system/frontend/src/App.jsx ---//
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute'; 

// Optional: A simple component for the navigation bar to centralize logout
const NavBar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-primary">MedLink</Link>
      <div>
        {isAuthenticated ? (
          <>
            {/* Updated for consistency with capitalized userRole */}
            {userRole === 'Patient' && <Link to="/patient-dashboard" className="text-dark hover:text-primary mx-2">Dashboard</Link>}
            {userRole === 'Doctor' && <Link to="/doctor-dashboard" className="text-dark hover:text-primary mx-2">Dashboard</Link>}
            {userRole === 'Admin' && <Link to="/admin-dashboard" className="text-dark hover:text-primary mx-2">Dashboard</Link>}
            <button onClick={handleLogout} className="text-dark hover:text-red-500 mx-2">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-dark hover:text-primary mx-2">Login</Link>
            <Link to="/signup" className="text-dark hover:text-primary mx-2">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-light text-dark">
        <NavBar /> 

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/patient-dashboard" element={<PrivateRoute component={PatientDashboard} role="Patient" />} />
          <Route path="/doctor-dashboard" element={<PrivateRoute component={DoctorDashboard} role="Doctor" />} />
          <Route path="/admin-dashboard" element={<PrivateRoute component={AdminDashboard} role="Admin" />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;