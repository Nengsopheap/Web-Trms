// src/api/auth.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Your backend base URL
});

export const login = (email, password) => {
  return api.post('/auth/login', { email, password });
};

export const logout = (token) => {
  return api.post(
    '/auth/logout',
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
