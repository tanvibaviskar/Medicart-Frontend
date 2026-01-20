import api from "./axios";

export const addMedicine = (data) => api.post("/medical/add-medicine", data);
export const getOrders = () => api.get("/medical/orders");
