import axiosInstance from "./axios";

// Wishlist eines Benutzers abrufen
export const getUserWishlist = (userId) => {
  return axiosInstance.get(`/users/${userId}/wishlist`);
};

// Neue Wishlist erstellen
export const createWishList = (wishlistData) => {
  return axiosInstance.post("/wishlists", wishlistData); // konsistente URL + Daten
};

// Wishlist bearbeiten
export const editWishList = (id, wishlistData) => {
  return axiosInstance.put(`/wishlists/${id}`, wishlistData); // korrigierte URL + Daten
};

// Wishlist löschen
export const deleteWishList = (id) => {
  return axiosInstance.delete(`/wishlists/${id}`); // korrigierte URL + ID
};

// Produkt zur Wishlist hinzufügen
export const addToWishlist = (userId, productId) => {
  return axiosInstance.post(`/users/${userId}/wishlist/items`, { productId });
};

// Produkt aus Wishlist entfernen
export const removeFromWishlist = (userId, productId) => {
  return axiosInstance.delete(`/users/${userId}/wishlist/items/${productId}`);
};

// Prüfen ob Produkt in Wishlist ist
export const isInWishlist = (userId, productId) => {
  return axiosInstance.get(
    `/users/${userId}/wishlist/items/${productId}/exists`
  );
};

// Alle Wishlists abrufen (öffentliche Wishlists)
export const getPublicWishlists = () => {
  return axiosInstance.get("/wishlists/public");
};

// Wishlist teilen
export const shareWishlist = (id) => {
  return axiosInstance.post(`/wishlists/${id}/share`);
};

// Wishlist-Statistiken
export const getWishlistStats = (userId) => {
  return axiosInstance.get(`/users/${userId}/wishlist/stats`);
};
