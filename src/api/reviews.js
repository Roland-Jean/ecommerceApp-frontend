import axiosInstance from "./axios";

// Alle Reviews abrufen
export const getReviews = () => {
  return axiosInstance.get("/reviews");
};

// Reviews für ein bestimmtes Produkt
export const getProductReviews = (productId) => {
  return axiosInstance.get(`/products/${productId}/reviews`);
};

// Einzelne Review abrufen
export const getReviewById = (id) => {
  return axiosInstance.get(`/reviews/${id}`);
};

// Review hinzufügen
export const addReview = (reviewData) => {
  return axiosInstance.post("/reviews", reviewData); // korrigierte URL + Daten
};

// Review aktualisieren
export const updateReview = (id, reviewData) => {
  return axiosInstance.put(`/reviews/${id}`, reviewData);
};

// Review löschen
export const deleteReview = (id) => {
  return axiosInstance.delete(`/reviews/${id}`);
};

// Reviews eines Benutzers
export const getUserReviews = (userId) => {
  return axiosInstance.get(`/users/${userId}/reviews`);
};

// Review-Statistiken für ein Produkt
export const getProductReviewStats = (productId) => {
  return axiosInstance.get(`/products/${productId}/reviews/stats`);
};
