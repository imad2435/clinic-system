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