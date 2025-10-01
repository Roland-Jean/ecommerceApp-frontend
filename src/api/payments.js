import axiosInstance from "./axios";

export const getPayments = () => {
  return axiosInstance.get("/payments");
};

export const getPaymentById = (id) => {
  return axiosInstance.get(`/payments/${id}`); // korrigierte Template Literals
};

// Payment-Methoden
export const getPaymentMethods = () => {
  return axiosInstance.get("/payment-methods");
};

// Payment verarbeiten
export const processPayment = (paymentData) => {
  return axiosInstance.post("/payments/process", paymentData);
};

// Payment-Intent erstellen (für Stripe, PayPal etc.)
export const createPaymentIntent = (amount, currency = "EUR") => {
  return axiosInstance.post("/payments/intent", { amount, currency });
};

// Payment-Status überprüfen
export const getPaymentStatus = (paymentId) => {
  return axiosInstance.get(`/payments/${paymentId}/status`);
};

// Refund verarbeiten
export const refundPayment = (paymentId, amount) => {
  return axiosInstance.post(`/payments/${paymentId}/refund`, { amount });
};

// Benutzer-Zahlungshistorie
export const getUserPayments = (userId) => {
  return axiosInstance.get(`/users/${userId}/payments`);
};
