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

export const fetchAllUserScores = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/all-scores`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user scores:', error);
    throw error;
  }
  
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/create`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// api/userApi.js
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};




