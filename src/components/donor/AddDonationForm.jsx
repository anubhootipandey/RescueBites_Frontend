import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Loader, 
  MapPin, 
  Package, 
  Type, 
  Heart, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  Send,
  Scale,
  MapPinIcon
} from 'lucide-react';
import { addDonation } from '../../services/donorService';
import Card from '../ui/Card';
import Button from '../ui/Button';

const AddDonationForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    foodType: '',
    quantity: '',
    location: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.foodType || !formData.quantity || !formData.location) {
        throw new Error('Please fill in all required fields');
      }

      const data = {
        foodType: formData.foodType,
        quantity: Number(formData.quantity),
        location: formData.location,
      };

      await addDonation(data, token);

      navigate('/donor', {
        state: { message: 'Food donation created successfully!' },
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Share Your Kindness
              </h1>
              <p className="text-gray-600 text-lg mt-1">Create a food donation to help those in need</p>
            </div>
          </div>
          <p className="text-gray-500 max-w-lg mx-auto">
            Every donation makes a difference. Fill out the form below to share your surplus food with the community.
          </p>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <Button
            variant="outline"
            onClick={() => navigate('/donor')}
            className="flex items-center space-x-2 hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Button>
        </motion.div>

        {/* Enhanced Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
            {/* Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">Donation Guidelines</h4>
                  <p className="text-sm text-blue-700">
                    Please ensure food is fresh, properly packaged, and safe for consumption. Include accurate pickup details.
                  </p>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center space-x-2"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Food Type Field */}
              <div>
                <label htmlFor="foodType" className="block text-sm font-semibold text-gray-700 mb-3">
                  <Type className="w-4 h-4 inline mr-2" />
                  What type of food are you donating? *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="foodType"
                    name="foodType"
                    value={formData.foodType}
                    onChange={handleChange}
                    placeholder="e.g., Fresh vegetables, cooked rice, canned goods..."
                    required
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <Package className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Be specific about the type and condition of food items
                </p>
              </div>

              {/* Quantity Field */}
              <div>
                <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-3">
                  <Scale className="w-4 h-4 inline mr-2" />
                  Quantity (in kg or units) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="e.g., 5"
                    required
                    min="1"
                    step="0.1"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <span className="text-sm text-gray-500 font-medium">kg</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Estimate the total weight or number of items
                </p>
              </div>

              {/* Location Field */}
              <div>
                <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-3">
                  <MapPinIcon className="w-4 h-4 inline mr-2" />
                  Pickup Location *
                </label>
                <div className="relative">
                  <textarea
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter complete pickup address including street, city, and any specific instructions..."
                    required
                    rows="4"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
                  />
                  <div className="absolute top-4 right-4">
                    <MapPin className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Provide detailed address and any special pickup instructions
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate('/donor')}
                  className="w-full sm:w-auto order-2 sm:order-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading || !formData.foodType.trim() || !formData.quantity.trim() || !formData.location.trim()}
                  className="w-full sm:flex-1 order-1 sm:order-2 py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin mr-2" />
                      Creating Donation...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Create Donation
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
                  <span>Quick Matching</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Impact Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Making a Difference</h4>
              <p className="text-gray-600 text-sm">
                Your donation will help feed families in need and reduce food waste in our community. 
                Thank you for your generosity! 🙏
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AddDonationForm;