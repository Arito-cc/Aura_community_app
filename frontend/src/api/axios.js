import axios from 'axios';

// Switch between local and production automatically
const isLocal = import.meta.env.MODE === 'development';

const API = axios.create({ 
  baseURL: isLocal 
    ? 'http://localhost:5000/api' 
    : import.meta.env.VITE_API_BASE_URL 
});

// Automatically attach JWT token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;