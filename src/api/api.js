import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; // Replace with your API base URL

// Function to perform login and get JWT token
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/authenticate`, { username, password });
    return response.data.access_token;
  } catch (error) {
    throw error;
  }
};

// Function to refresh the JWT token
export const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/refresh`, { refresh_token: refreshToken });
    return response.data.access_token;
  } catch (error) {
    throw error;
  }
};