import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  if (!token) {
    // No token found, user is not authenticated.
    // Redirect them to the login page.
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    
    alert('Access Denied: You do not have the necessary permissions for this page.'); 
    return <Navigate to="/" replace />; 
  }


  return <Component />;
};

export default PrivateRoute;