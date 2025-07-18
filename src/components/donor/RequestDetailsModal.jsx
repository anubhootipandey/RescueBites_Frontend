import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";

const RequestDetailsModal = ({ donation, onClose, onSend }) => {
  if (!donation) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Request Details</h2>
        <div className="space-y-2 text-gray-700">
          <p><strong>Food Type:</strong> {donation.foodType}</p>
          <p><strong>Quantity:</strong> {donation.quantity} kg</p>
          <p><strong>Location:</strong> {donation.location}</p>
          <p><strong>Status:</strong> {donation.status}</p>
          <p className="mb-2"><strong>Contact Number:</strong> {selectedDonation.contactNumber}</p>
        </div>

        {donation.status === "requested" && (
          <div className="mt-6">
            <Button
              onClick={() => onSend(donation._id)}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Mark as Sent
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default RequestDetailsModal;
