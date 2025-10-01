import axiosInstance from "./axios";

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post('/login', {
      auth: {
        email,
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
