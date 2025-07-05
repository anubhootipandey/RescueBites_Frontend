import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMyDonations, updateDonationById } from '../../services/donorService';
import { Loader } from 'lucide-react';

const EditDonation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    foodType: '',
    quantity: '',
    location: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const res = await getMyDonations(token);
        const donation = res.data.find((d) => d._id === id);

        if (!donation) {
          setError('Donation not found');
          return;
        }

        setFormData({
          foodType: donation.foodType,
          quantity: donation.quantity,
          location: donation.location,
        });
      } catch (err) {
        setError('Failed to load donation.');
      } finally {
        setLoading(false);
      }
    };

    fetchDonation();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await updateDonationById(id, formData, token);
      navigate('/donor');
    } catch (err) {
      setError('Failed to update donation.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center py-10">Loading donation...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Edit Donation</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Food Type */}
        <div>
          <label htmlFor="foodType" className="block text-sm font-medium text-gray-700 mb-1">
            Food Type
          </label>
          <input
            type="text"
            id="foodType"
            name="foodType"
            value={formData.foodType}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:ring focus:outline-none"
            required
          />
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
            Quantity (kg or servings)
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:ring focus:outline-none"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:ring focus:outline-none"
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        {/* Submit */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => navigate('/donor')}
            className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <Loader className="animate-spin w-4 h-4" /> Saving...
              </span>
            ) : (
              'Update Donation'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDonation;
