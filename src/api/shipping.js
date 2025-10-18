import axiosInstance from "./axios";

// Versandoptionen für Benutzer abrufen
export const getShipping = (userId) => {
  return axiosInstance.get(`/shipping/${userId}`); // korrigierte Template Literals
};

// Alle verfügbaren Versandmethoden
export const getShippingMethods = () => {
  return axiosInstance.get("/shipping/methods");
};

// Versandkosten berechnen
export const calculateShippingCost = (shippingData) => {
  return axiosInstance.post("/shipping/calculate", shippingData);
};

// Versandadresse hinzufügen/aktualisieren
export const updateShippingAddress = (userId, addressData) => {
  return axiosInstance.put(`/users/${userId}/shipping-address`, addressData);
};

// Versandadresse abrufen
export const getShippingAddress = (userId) => {
  return axiosInstance.get(`/users/${userId}/shipping-address`);
};

// Sendungsverfolgung
export const trackShipment = (trackingNumber) => {
  return axiosInstance.get(`/shipping/track/${trackingNumber}`);
};

// Versandstatus für Bestellung
export const getOrderShippingStatus = (orderId) => {
  return axiosInstance.get(`/orders/${orderId}/shipping`);
};

// Verfügbare Lieferzeiten prüfen
export const getDeliveryEstimate = (zipCode, shippingMethod) => {
  return axiosInstance.get(
    `/shipping/estimate?zip=${zipCode}&method=${shippingMethod}`
  );
};
