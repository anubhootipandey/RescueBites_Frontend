import React, { useState } from "react";
import { requestFood } from "../../services/recipientService";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Send, Package, MapPin, AlertCircle, CheckCircle } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";

const RequestFoodForm = () => {
  const [neededItems, setNeededItems] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await requestFood({ neededItems, address, contactNumber });
      toast.success("✅ Food request submitted successfully!");
      navigate("/recipient/dashboard", {
        state: { requested: true },
      });
    } catch (error) {
      toast.error("❌ Failed to submit request. Please try again.");
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
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <Package className="w-4 h-4 inline mr-2" />
              What food items do you need?
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g., Rice, vegetables, canned goods, bread..."
                className="w-full px-4 py-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                value={neededItems}
                onChange={(e) => setNeededItems(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <Package className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Be specific about quantities and types of food you need
            </p>
          </div>

          {/* Contact Number Field */}
<div>
  <label className="block text-sm font-semibold text-gray-700 mb-3">
    📞 Contact Number
  </label>
  <div className="relative">
    <input
      type="tel"
      placeholder="Enter your phone number"
      className="w-full px-4 py-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
      value={contactNumber}
      onChange={(e) => setContactNumber(e.target.value)}
      required
    />
  </div>
  <p className="text-xs text-gray-500 mt-2">
    We'll use this number to contact you about your request.
  </p>
</div>


          {/* Address Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <MapPin className="w-4 h-4 inline mr-2" />
              Delivery Address
            </label>
            <div className="relative">
              <textarea
                placeholder="Enter your complete address including street, city, and postal code..."
                className="w-full px-4 py-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
                rows="4"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <div className="absolute top-4 right-4">
                <MapPin className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Provide a complete address for accurate delivery or pickup coordination
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <Button
              type="submit"
              disabled={isSubmitting || !neededItems.trim() || !address.trim()}
              className="w-full py-4 text-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Link to="/recipient/dashboard">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Submitting Request...</span>
                  </Link>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Food Request</span>
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