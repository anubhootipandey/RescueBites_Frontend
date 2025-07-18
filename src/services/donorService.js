import api from "../utils/api";
import axios from "axios";

const getDashboardData = async () =>
  await api.get('/donor/dashboard');

const addDonation = async (data) =>
  await api.post('/donor/donate', data);

const getMyDonations = async () =>
  await api.get('/donor/my-donations');

const updateDonationById = (id, updatedData, token) => {
  return axios.put(`/api/donor/donate/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const markRequestAsSent = (requestId) => {
  const token = localStorage.getItem("token");
  return api.put(`/donor/send-request/${requestId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const markDonationAsSent = (donationId) => {
  const token = localStorage.getItem("token");
  return api.put(`/donor/send-donation/${donationId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const markDonationComplete = (donationId) => {
  const token = localStorage.getItem("token");
  return api.patch(`/donor/mark-donation-complete/${donationId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getApprovedRequests = () => {
  const token = localStorage.getItem("token");
  return api.get("/donor/approved-requests", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const sendFood = (donationId) =>
  api.put(`/donor/send-food/${donationId}`);

export {
  getDashboardData,
  addDonation,
  getMyDonations,
  updateDonationById,
  markRequestAsSent,
  markDonationAsSent,
  markDonationComplete,
  getApprovedRequests,
  sendFood,
};
