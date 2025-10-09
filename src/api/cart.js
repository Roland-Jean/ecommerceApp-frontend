import axiosInstance from "./axios";

export const getAllCart = () => {
  return axiosInstance.get("/carts");
};

export const getCartById = (id) => {
  return axiosInstance.get(`/carts/${id}`); // Backticks für Template Literal
};

export const createCart = (cartData) => {
  return axiosInstance.post("/carts", cartData);
};

export const addToCart = (productId, quantity = 1) => {
  return axiosInstance.post("/carts/add", { productId, quantity });
};

export const removeFromCart = (cartItemId) => {
  return axiosInstance.delete(`/carts/items/${cartItemId}`);
};

export const updateCartItem = (cartItemId, quantity) => {
  return axiosInstance.put(`/carts/items/${cartItemId}`, { quantity });
};

export const clearCart = (cartId) => {
  return axiosInstance.delete(`/carts/${cartId}`);
};
