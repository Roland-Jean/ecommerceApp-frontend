import axiosInstance from "./axios";

// Alle Benutzer abrufen (Admin-Funktion)
export const getAllUsers = () => {
  return axiosInstance.get("/users");
};

// Einzelnen Benutzer abrufen
export const getUserById = (id) => {
  return axiosInstance.get(`/users/${id}`); // korrigierte URL + Template Literals
};

// Neuen Benutzer erstellen
export const createUser = (userData) => {
  return axiosInstance.post("/users/register", userData); // korrigierte URL + Daten
};

// Benutzer aktualisieren
export const editUser = (id, userData) => {
  return axiosInstance.put(`/users/${id}`, userData); // korrigierte URL + ID + Daten
};

// Benutzer löschen
export const deleteUser = (id) => {
  return axiosInstance.delete(`/users/${id}`);
};

// Aktuellen Benutzer abrufen (basierend auf Token)
export const getCurrentUser = () => {
  return axiosInstance.get("/users/me");
};

// Benutzerprofil aktualisieren
export const updateProfile = (profileData) => {
  return axiosInstance.put("/users/me/profile", profileData);
};

// Passwort ändern
export const changePassword = (passwordData) => {
  return axiosInstance.put("/users/me/password", passwordData);
};

// Avatar/Profilbild hochladen
export const uploadAvatar = (formData) => {
  return axiosInstance.post("/users/me/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Benutzerkonto deaktivieren
export const deactivateAccount = () => {
  return axiosInstance.patch("/users/me/deactivate");
};
