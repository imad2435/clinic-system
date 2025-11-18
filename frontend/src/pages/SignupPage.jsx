import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [specialization, setSpecialization] = useState(''); 
  const [role, setRole] = useState('Patient');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
console.log('Selected Role:', role);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const userData = { name, email, password, role };
    if (role === 'Doctor') {
      userData.specialization = specialization; // Add specialization for doctors
    }

    try {
       
      await registerUser(userData);
      setSuccess('Registration successful! Please log in.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-secondary mb-6">Create Your MedLink Account</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-dark mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition duration-200"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-dark mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition duration-200"
              placeholder="your@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-dark mb-1">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition duration-200"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-dark mb-1">Register as:</label>
            <select
              id="role"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition duration-200 bg-white"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          {role === 'Doctor' && ( // Conditionally render specialization field for doctors
            <div>
              <label htmlFor="specialization" className="block text-sm font-medium text-dark mb-1">Specialization</label>
              <input
                type="text"
                id="specialization"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition duration-200"
                placeholder="e.g., Cardiology, Pediatrics"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                required={role === 'Doctor'} // Make required only for doctors
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-secondary text-black py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition duration-300 shadow-md"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-dark mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-secondary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;