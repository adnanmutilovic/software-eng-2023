import axios from 'axios';

export const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
    if (response.data.token) {
      // Save the token in local storage for further usage
      localStorage.setItem('token', response.data.token);
      return response.data;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    throw error;
  }
};

export const register = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/register', { email, password });
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error('Registration failed');
    }
  } catch (error) {
    throw error;
  }
};
