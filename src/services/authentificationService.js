import { loginUser, registerUser } from "../api/auth";

// Login Service
export const loginService = async (user) => {
  try {
    const response = await loginUser(user.email, user.password);

    // Token und User-Daten speichern
    if (response.token) {
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    }

    return response;
  } catch (error) {
    console.error("Login service error:", error);
    throw error;
  }
};

// Logout Service
export const logoutService = () => {
  // Token und User-Daten aus localStorage entfernen
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");

  return Promise.resolve({ success: true, message: "Logout successful" });
};

// Register Service
export const registerUserService = async (userData) => {
  try {
    const response = await registerUser(userData);

    // Optional: Automatisches Login nach erfolgreicher Registrierung
    if (response.token) {
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    }

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
