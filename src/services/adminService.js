import api from "../utils/api";

// Fetch Admin Dashboard Data
export const getAdminDashboard = async () => {
  return await api.get('/admin/dashboard');
};

// Fetch All Food Requests
export const getAllRequests = async () => {
  return await api.get('/admin/requests');
};

// Update Request Status (approve/reject)
export const updateRequestStatus = async (requestId, status) => {
  return await api.put(`/admin/requests/${requestId}`, { status });
};

// Mark Request as Completed (if used in UI)
export const markRequestCompleted = async (requestId) => {
  return await api.put(`/admin/requests/complete/${requestId}`);
};

export const getAllDonations = async () => {
  return await api.get('/admin/donations');
};