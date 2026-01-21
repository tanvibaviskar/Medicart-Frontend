// src/api/medicalService.js

import api from "./axios";

/**
 * Register a new medical user
 * @param {Object} data - { userDetails: {fullname, email, password, contact}, license, latitude, longitude }
 * @returns {Promise} Axios response
 */
export const registerMedical = async (data) => {
  try {
    const response = await api.post("/medicals/signup", data);
    return response;
  } catch (error) {
    // Throw to be handled in component
    throw error;
  }
};

/**
 * Login medical user
 * @param {Object} data - { email, password }
 * @returns {Promise} Axios response
 */
export const loginMedical = async (data) => {
  try {
    const response = await api.post("/medical/login", data);
    // optionally save token in localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Add a new medicine (requires authentication)
 * @param {Object} data - { name, price, quantity, description, etc. }
 * @returns {Promise} Axios response
 */
export const addMedicine = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post("/medical/add-medicine", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all orders for this medical (requires authentication)
 * @returns {Promise} Axios response
 */
export const getOrders = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/medical/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Logout medical user
 */
export const logoutMedical = () => {
  localStorage.removeItem("token");
};
