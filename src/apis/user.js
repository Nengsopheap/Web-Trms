// api/userApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Change if different

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
