import React, { useEffect, useState } from "react";
import {
  getDashboardData,
  getMyDonations,
  deleteDonation,
} from "../../services/donorService";
import { motion } from "framer-motion";
import {
  Package,
  Archive,
  Clock,
  CheckCircle,
  Trash2,
  Plus,
  TrendingUp,
  Heart,
  Award,
  BarChart3,
  Gift,
  Users,
  Calendar,
  MapPin,
  AlertTriangle,
} from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import Button from "../ui/Button";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DonorDashboard = () => {
  const [data, setData] = useState(null);
  const [myDonations, setMyDonations] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchAllData() {
      try {
        const dashboardRes = await getDashboardData();
        setData(dashboardRes.data);

        const myDonationsRes = await getMyDonations(token);
        setMyDonations(myDonationsRes.data);
      } catch (err) {
        console.error("Dashboard Error:", err);
      }
    }

    fetchAllData();
  }, [token]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this donation?");
    if (!confirm) return;
    try {
      await deleteDonation(id);
      setMyDonations((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete donation.");
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Donations",
      value: data.stats?.totalDonations || 0,
      icon: Package,
      color: "blue",
      bgGradient: "from-blue-500 to-blue-600",
      lightBg: "bg-blue-50",
      description: "All time contributions",
    },
    {
      label: "Available",
      value: data.stats?.available || 0,
      icon: Archive,
      color: "yellow",
      bgGradient: "from-yellow-500 to-orange-500",
      lightBg: "bg-yellow-50",
      description: "Ready for pickup",
    },
    {
      label: "Requested",
      value: data.stats?.requested || 0,
      icon: Clock,
      color: "purple",
      bgGradient: "from-purple-500 to-purple-600",
      lightBg: "bg-purple-50",
      description: "Being processed",
    },
    {
      label: "Completed",
      value: data.stats?.completed || 0,
      icon: CheckCircle,
      color: "green",
      bgGradient: "from-green-500 to-green-600",
      lightBg: "bg-green-50",
      description: "Successfully delivered",
    },
  ];

  const chartData = {
    labels: ["Available", "Requested", "Completed"],
    datasets: [
      {
        label: "Donations by Status",
        data: [
          data.stats?.available || 0,
          data.stats?.requested || 0,
          data.stats?.completed || 0,
        ],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(147, 51, 234, 0.8)",
          "rgba(34, 197, 94, 0.8)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(147, 51, 234, 1)",
          "rgba(34, 197, 94, 1)",
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            weight: 500,
          },
        },
      },
      title: { 
        display: true, 
        text: "Your Donation Statistics",
        font: {
          size: 16,
          weight: 600,
        },
        padding: 20,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'available': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'requested': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="p-4 sm:p-6 lg:p-8 space-y-8 lg:space-y-10">
        {/* Enhanced Header */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome Back, {data.donorName || "Donor"}!
              </h2>
              <p className="text-gray-600 text-lg lg:text-xl mt-2">
                Thank you for making a difference in our community 🙌
              </p>
            </div>
          </div>
          <p className="text-gray-500 text-base lg:text-lg max-w-2xl mx-auto">
            Here's a comprehensive overview of your donation activity and impact
          </p>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Card className={`p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-${stat.color}-500 ${stat.lightBg}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span>{stat.description}</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.bgGradient} rounded-xl flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-6 lg:p-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-2xl transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <h3 className="text-xl lg:text-2xl font-bold mb-2">Ready to Make Another Impact?</h3>
                <p className="text-blue-100 text-sm lg:text-base">
                  Create a new donation and help someone in need today
                </p>
              </div>
              <Button
                onClick={() => navigate("/donor/create")}
                variant="secondary"
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New Donation
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Enhanced Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="p-6 lg:p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Donation Analytics</h3>
                <p className="text-gray-600">Visual breakdown of your contribution status</p>
              </div>
            </div>
            <div className="h-80 lg:h-96">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </Card>
        </motion.div>

        {/* Enhanced Donations Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center space-x-3 mb-6 lg:mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">My Donations</h3>
              <p className="text-gray-600">Track and manage all your contributions</p>
            </div>
          </div>

          {myDonations.length === 0 ? (
            <Card className="p-8 lg:p-12 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">No donations yet</h4>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Start making a difference by creating your first donation. Every contribution helps someone in need.
              </p>
              <Button
                onClick={() => navigate("/donor/create")}
                size="lg"
                className="inline-flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Donation
              </Button>
            </Card>
          ) : (
            <div className="grid gap-4 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {myDonations.map((donation, index) => (
                <motion.div
                  key={donation._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-400">
                    <div className="space-y-4">
                      {/* Donation Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Package className="w-5 h-5 text-blue-500" />
                            <h4 className="font-bold text-gray-900 text-lg">
                              {donation.foodType}
                            </h4>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <span className="font-medium">Quantity:</span>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                {donation.quantity}kg
                              </span>
                            </div>
                            <div className="flex items-start space-x-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              <span>{donation.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Status and Actions */}
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(donation.status)}`}>
                            {donation.status?.charAt(0).toUpperCase() + donation.status?.slice(1) || 'Available'}
                          </span>
                          
                          <button
                            onClick={() => handleDelete(donation._id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 group"
                            title="Delete donation"
                          >
                            <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                          </button>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="pt-2 border-t border-gray-50">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>Created recently</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>Community impact</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Impact Summary */}
        {myDonations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card className="p-6 lg:p-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Your Community Impact</h4>
                <p className="text-gray-600 mb-4">
                  You've made <span className="font-bold text-green-600">{myDonations.length}</span> donation{myDonations.length !== 1 ? 's' : ''} 
                  {' '} and helped feed families in need. Thank you for your generosity!
                </p>
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Verified Donor</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>Community Hero</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span>Impact Maker</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;