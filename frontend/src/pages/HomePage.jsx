import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4 text-center">
      <h1 className="text-5xl font-extrabold text-primary mb-6">Welcome to MedLink</h1>
      <p className="text-xl text-dark mb-8 max-w-2xl">
        Your comprehensive solution for online appointments and clinic management.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-8 py-3 bg-primary border border-primary text-black font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-8 py-3 border border-primary text-primary font-semibold rounded-lg shadow-md hover:bg-blue-50 transition duration-300"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default HomePage;