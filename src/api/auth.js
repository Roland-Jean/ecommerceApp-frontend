import axiosInstance from "./axios";

export const loginUser = async (user) => {
  try {
    const response = await axiosInstance.post('/auth/login', user);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/users/register", userData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};
