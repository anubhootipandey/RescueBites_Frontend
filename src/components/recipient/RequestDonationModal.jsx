import React, { useState } from "react";
import { X } from "lucide-react";

const RequestDonationModal = ({ donation, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
    quantity: donation.quantity || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X />
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Request Donation - {donation.foodType}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="contact"
            type="text"
            placeholder="Contact Number"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={formData.contact}
            onChange={handleChange}
            required
          />
          <input
            name="address"
            type="text"
            placeholder="Your Address"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            name="quantity"
            type="text"
            placeholder="Quantity Needed"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={formData.quantity}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestDonationModal;
