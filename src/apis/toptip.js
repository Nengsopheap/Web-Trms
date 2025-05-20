// src/api/toptip.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/toptip'; // Your backend API URL

// Function to fetch all toptips
export const getToptips = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data; // Return the fetched data
  } catch (error) {
    console.error('Error fetching toptips:', error);
    throw error;
  }
};
