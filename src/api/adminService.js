import api from "./axios";

export const getAllMedicalStores = () => api.get("/admin/medical-stores");
export const approveStore = (id) => api.put(`/admin/approve/${id}`);
export const rejectStore = (id) => api.put(`/admin/reject/${id}`);
export const getAllCustomers = () => api.get("/admin/customers");
