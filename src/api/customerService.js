import api from "./axios";

export const searchMedicine = (name) =>
  api.get(`/customer/search?name=${name}`);

export const addToCart = (data) => api.post("/cart/add", data);

export const placeOrder = () => api.post("/order/place");
