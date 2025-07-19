import React, { useState } from "react";
import { requestFood } from "../../services/recipientService";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Send, Package, MapPin, AlertCircle, CheckCircle } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";

const RequestFoodForm = () => {
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientType: "Individual",
    neededItems: "",
    quantity: "",
    contactNumber: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    deliveryType: "Need Delivery", // Default value
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const address = {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      };

      await requestFood({
        recipientName: formData.recipientName,
        recipientType: formData.recipientType,
        neededItems: formData.neededItems,
        quantity: formData.quantity,
        contactNumber: formData.contactNumber,
        deliveryType: formData.deliveryType,
        address,
      });

      toast.success("Food request submitted successfully!");
      navigate("/recipient/dashboard", { state: { requested: true } });
    } catch (error) {
      toast.error(" Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-5 sm:p-8 hover:shadow-xl transition-all duration-300">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Request Food Assistance
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Fill out the form below to request food assistance from our community
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">Request Guidelines</h4>
              <p className="text-sm text-blue-700">
                Please be specific about your food needs and provide an accurate address for delivery or pickup.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Needed Items Field */}
          <div>
            <label className="block font-semibold mb-1">👤 Recipient Name *</label>
            <input
              type="text"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">🏢 Recipient Type *</label>
            <select
  name="recipientType"
  value={formData.recipientType}
  onChange={handleChange}
  required
  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm"
>
  <option value="Individual">Individual</option>
  <option value="Organization">Organization</option>
</select>
          </div>

          {/* Food Info */}
          <div>
            <label className="block font-semibold mb-1">🍲 Needed Items *</label>
            <input
              type="text"
              name="neededItems"
              value={formData.neededItems}
              onChange={handleChange}
              required
              placeholder="e.g., Rice, bread, vegetables..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">📦 Quantity *</label>
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              placeholder="e.g., 5kg, 10 packets"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block font-semibold mb-1">📞 Contact Number *</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              placeholder="Phone number"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block font-semibold mb-1">🏠 Address Details *</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="street"
                placeholder="Street"
                value={formData.street}
                onChange={handleChange}
                required
                className="px-4 py-3 border border-gray-300 rounded-xl shadow-sm"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
                className="px-4 py-3 border border-gray-300 rounded-xl shadow-sm"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                required
                className="px-4 py-3 border border-gray-300 rounded-xl shadow-sm"
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                className="px-4 py-3 border border-gray-300 rounded-xl shadow-sm"
              />
            </div>
          </div>

          {/* Delivery Type */}
<div>
  <label className="block font-semibold mb-1">🚚 Delivery Preference *</label>
  <select
    name="deliveryType"
    value={formData.deliveryType}
    onChange={handleChange}
    required
    className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm"
  >
    <option value="self-pickup">Self Pickup</option>
    <option value="need-delivery">Need Delivery</option>
  </select>
  <p className="text-sm text-gray-500 mt-1">
    Select whether you’ll pick up the food or want it delivered.
  </p>
</div>


          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Request</span>
                </>
              )}
            </Button>
          </div>
        </form>
        {/* Success Indicators */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Secure Submission</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Community Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Quick Response</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RequestFoodForm;