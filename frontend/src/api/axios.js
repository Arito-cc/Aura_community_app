import axios from 'axios';

// 2. Set the Base URL
// It will use localhost if you are running 'npm run dev' 
// It will use your Render link if you are on the live site
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const API = axios.create({ baseURL: API_URL });

// 3. Attach Token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;