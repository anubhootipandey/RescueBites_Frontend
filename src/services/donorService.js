// /services/donorService.js

import api from "../utils/api";

const getDashboardData = async () =>
  await api.get('/donor/dashboard');

const addDonation = async (data) =>
  await api.post('/donor/donate', data);

const getMyDonations = async () =>
  await api.get('/donor/my-donations');

const deleteDonation = (id) => {
  return api.delete(`/donor/donate/${id}`);
};

const updateDonationById = (id, updatedData, token) => {
  return axios.put(`/api/donor/donate/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { getDashboardData, addDonation, getMyDonations, deleteDonation, updateDonationById };
