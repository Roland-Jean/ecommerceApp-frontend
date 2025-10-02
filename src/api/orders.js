import axiosInstance from "./axios";

export const getAllOrders = () => {
  return axiosInstance.get("/orders");
};

export const getOrderById = (id) => {
  return axiosInstance.get(`/orders/${id}`);
};

export const deleteOrder = (id) => {
  return axiosInstance.delete(`/orders/${id}`); // korrigierte URL
};

export const deleteAllOrders = () => {
  return axiosInstance.delete("/orders");
};

export const addOrder = (orderData) => {
  return axiosInstance.post("/orders", orderData); // korrigierte URL + Daten
};

export const editOrder = (id, orderData) => {
  return axiosInstance.put(`/orders/${id}`, orderData); // korrigierte URL + Daten
};

// Zusätzliche nützliche Funktionen:
export const getUserOrders = (userId) => {
  return axiosInstance.get(`/users/${userId}/orders`);
};

export const updateOrderStatus = (id, status) => {
  return axiosInstance.patch(`/orders/${id}/status`, { status });
};
