// clinic-system/frontend/src/api.js
const API_BASE_URL = 'http://localhost:5000/api'; 

const makeApiRequest = async (url, method, body, includeAuth = false) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      throw new Error('No authentication token found.');
    }
  }

  const config = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      // Corrected: Removed extra 'new' keyword
      throw new Error(data.message || `API request failed with status: ${response.status}`);
    }
    return data;
  } catch (error) {
    console.error(`API Request to ${url} failed:`, error);
    throw error;
  }
};

export const loginUser = async (email, password, role) => {
  let endpoint;
  switch (role) {
    // Updated case values to 'Patient', 'Doctor', 'Admin'
    case 'Patient': 
      endpoint = `${API_BASE_URL}/patients/login`; // Pluralized endpoint
      break;
    case 'Doctor':
      endpoint = `${API_BASE_URL}/doctors/login`;   // Pluralized endpoint
      break;
    case 'Admin':
      endpoint = `${API_BASE_URL}/admins/login`;     // Pluralized endpoint
      break;
    default:
      throw new Error('Invalid role specified for login.');
  }
 
  const data = await makeApiRequest(endpoint, 'POST', { email, password });
  
  let user;
  // Mapped capitalized frontend role to lowercase backend response keys
  if (role === 'Admin') user = data.admin; 
  else if (role === 'Doctor') user = data.doctor;
  else if (role === 'Patient') user = data.patient;

  return { token: data.token, user }; 
};

export const registerUser = async (userData) => {

  const { role, specialization, ...rest } = userData; 

  let endpoint;
  let body;

  switch (role) {
    // Updated case values to 'Patient', 'Doctor', 'Admin'
    case 'Patient': 
      endpoint = `${API_BASE_URL}/patients/register`; // Pluralized endpoint
      body = { ...rest, role };
      break;
    case 'Doctor':
      endpoint = `${API_BASE_URL}/doctors/register`;   // Pluralized endpoint
      body = { ...rest, specialization, role }; 
      break;
    case 'Admin':
      endpoint = `${API_BASE_URL}/admins/register`;     // Pluralized endpoint
      body = { ...rest, role };
      break;
    default:
      throw new Error('Invalid role specified for registration.');
  }

  const data = await makeApiRequest(endpoint, 'POST', body);
  return data;
};

export const getUserProfile = async (role) => {
    let endpoint;
    switch (role) {
      // Updated case values to 'Patient', 'Doctor', 'Admin'
      case 'Patient':
        endpoint = `${API_BASE_URL}/patients/profile`; // Pluralized endpoint
        break;
      case 'Doctor':
        endpoint = `${API_BASE_URL}/doctors/profile`;   // Pluralized endpoint
        break;
      case 'Admin':
        endpoint = `${API_BASE_URL}/admins/profile`;     // Pluralized endpoint
        break;
      default:
        throw new Error('Invalid role specified for profile fetch.');
    }
    return makeApiRequest(endpoint, 'GET', null, true); 
};

// Add this new function to frontend/src/api.js

export const getMyAppointments = async () => {
  const endpoint = `${API_BASE_URL}/appointments/my`;
  // The `true` at the end tells makeApiRequest to include the auth token
  return makeApiRequest(endpoint, 'GET', null, true);
};

// Add this new function to frontend/src/api.js

export const getDoctorSchedule = async () => {
  const endpoint = `${API_BASE_URL}/appointments/schedule`;
  // The `true` at the end includes the Doctor's auth token
  return makeApiRequest(endpoint, 'GET', null, true); 
};

// Add this new function to frontend/src/api.js

export const getDashboardStats = async () => {
  const endpoint = `${API_BASE_URL}/dashboard/stats`;
  // The `true` includes the Admin's auth token
  return makeApiRequest(endpoint, 'GET', null, true);
};

// Add these two functions to frontend/src/api.js

// Fetches a list of all registered doctors
export const getAllDoctors = async () => {
  // This endpoint uses the logic from `doctor.controller.js`'s `getDoctors` function
  const endpoint = `${API_BASE_URL}/doctors/profile`; 
  // A patient needs to be logged in to see doctors
  return makeApiRequest(endpoint, 'GET', null, true);
};

// Books a new appointment
export const bookAppointment = async (appointmentData) => {
  const endpoint = `${API_BASE_URL}/appointments/book`;
  // `appointmentData` will be an object like { doctorId, appointmentDate, reason }
  return makeApiRequest(endpoint, 'POST', appointmentData, true);
};

// Add this new function to frontend/src/api.js

export const cancelAppointment = async (appointmentId) => {
  const endpoint = `${API_BASE_URL}/appointments/${appointmentId}/cancel`;
  // This is a PUT request and requires authentication
  return makeApiRequest(endpoint, 'PUT', null, true);
};

// Add this new function to frontend/src/api.js

export const markAsCompleted = async (appointmentId) => {
  const endpoint = `${API_BASE_URL}/appointments/${appointmentId}/complete`;
  // This is a PUT request and requires authentication
  return makeApiRequest(endpoint, 'PUT', null, true);
};