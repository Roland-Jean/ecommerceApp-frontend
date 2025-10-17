import { Navigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/auth";
import toast from "react-hot-toast";

// Login Service
export const loginService = async (user) => {
  console.log(user);
  try {
    const response = await loginUser(user);
    if (response.token) {
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      toast.success("Login successful");
    }
    return response;
  } catch (error) {
    toast.error("Login failed. Please check your credentials.");
    throw error;
  }
};

// Logout Service
export const logoutService = () => {
  // Token und User-Daten aus localStorage entfernen
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  toast.success("Logout successful");
  return Promise.resolve({ success: true, message: "Logout successful" });
};

// Register Service
export const registerUserService = async (userData) => {
  try {
    const transformedData = {
      ...userData,
      username: `${userData.firstName} ${userData.lastName}`.trim(),
    };
    delete transformedData.firstName;
    delete transformedData.lastName;
    console.log(transformedData);
    const response = await registerUser(transformedData);
    return response;
  } catch (error) {
    console.error("Registration service error:", error);
    throw error;
  }
};

// Zusätzliche nützliche Authentication Services:

// Prüfen ob User eingeloggt ist
export const isAuthenticatedService = () => {
  const token = localStorage.getItem("authToken");
  return !!token;
};

// Aktuellen User aus localStorage abrufen
export const getCurrentUserService = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

// Auth Token abrufen
export const getTokenService = () => {
  return localStorage.getItem("authToken");
};

// Session validieren
export const validateSessionService = () => {
  const token = getTokenService();
  const user = getCurrentUserService();

  return !!(token && user);
};

// User-Daten aktualisieren (nach Profil-Updates)
export const updateUserInStorageService = (updatedUser) => {
  localStorage.setItem("user", JSON.stringify(updatedUser));
  return updatedUser;
};
