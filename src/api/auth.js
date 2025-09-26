import axiosInstance from "./axios";

export const loginUser = async (username, password) => {
  try {
    const response = await axiosInstance.post('/login', {
      auth: {
        username,
        password,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};
