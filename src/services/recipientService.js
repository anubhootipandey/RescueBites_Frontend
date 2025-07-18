// src/services/recipientService.js
import api from "../utils/api";

export const getRecipientDashboard = () =>
  api.get("/recipient/dashboard");

export const requestFood = (payload) =>
  api.post("/recipient/request", payload); // Used above

export const getAvailableDonations = () => {
  return api.get('/recipient/available-donations');
};

export const requestDonation = (donationId) =>
  api.put(`/recipient/claim-donation/${donationId}`);

export const claimDonation = (donationId) =>
  api.post(`/recipient/claim-donation/${donationId}`);
