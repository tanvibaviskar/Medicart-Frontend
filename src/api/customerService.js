import api from "./axios";
import axiosInstance from "./axios"; // तुझा axiosInstance

export const getNearbyMedicals = () => {
  return axiosInstance.get("/customers/nearby-medicals"); 
  // ⚠️ Do NOT wrap in another data layer
};
// 🔍 Search medicines
export const searchMedicine = (name) =>
  api.get(`/customer/search?name=${name}`);

// 🛒 Add to cart
export const addToCart = (data) =>
  api.post("/cart/add", data);

// 📦 Place order
export const placeOrder = () =>
  api.post("/order/place");

// 🧾 Customer registration
export const registerCustomer = (customerData) =>
  api.post("/customers/signup", customerData);

