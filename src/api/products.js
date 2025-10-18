import axiosInstance from "./axios";

export const getAllProducts = () => {
  return axiosInstance.get("/products");
};

export const getProductById = (id) => {
  return axiosInstance.get(`/product/${id}`); // Backticks + Parameter
};

export const deleteProductById = (id) => {
  return axiosInstance.delete(`/product/${id}`); // Backticks + Parameter
};

export const deleteAllProducts = () => {
  // korrigierte Benennung
  return axiosInstance.delete("/products");
};

export const addProduct = (productData) => {
  // korrigierter Name + Daten
  return axiosInstance.post("/products", productData);
};

export const updateProductById = (id, productData) => {
  // ID + Daten
  return axiosInstance.put(`/products/${id}`, productData);
};

// Zusätzliche nützliche Funktionen:
export const searchProducts = (query) => {
  return axiosInstance.get(`/products/search?q=${query}`);
};

export const getProductsByCategory = (categoryId) => {
  return axiosInstance.get(`/products?category=${categoryId}`);
};

export const getFeaturedProducts = () => {
  return axiosInstance.get("/products/featured");
};
