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
  LayoutDashboard,
  PieChart,
  HandHeart,
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
import api from "../../utils/api";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // Optional to handle dynamic window


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DonorDashboard = () => {
  const [data, setData] = useState(null);
  const [myDonations, setMyDonations] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [approvedRequests, setApprovedRequests] = useState([]);
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
const [showConfetti, setShowConfetti] = useState(false);

  const token = localStorage.getItem("token");

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "analytics", label: "Analytics", icon: PieChart },
    { id: "donations", label: "My Donations", icon: Gift },
    { id: "requests", label: "Approved Requests", icon: HandHeart },
    { id: "rewards", label: "My Rewards", icon: Award },
  ];

  useEffect(() => {
    const fetchApprovedRequests = async () => {
      try {
        const res = await api.get("/donor/approved-requests");
        console.log("Approved Requests Response:", res.data);
        setApprovedRequests(res.data.approvedRequests || []);
      } catch (err) {
        console.error("Failed to fetch approved requests", err);
      }
    };
    fetchApprovedRequests();
  }, []);

  useEffect(() => {
  async function fetchAllData() {
    try {
      const dashboardRes = await getDashboardData();
      setData(dashboardRes.data);

      // 🎉 If rewards increased, show confetti
      const previousRewards = JSON.parse(localStorage.getItem("rewards")) || [];
      const currentRewards = dashboardRes.data.rewards || [];

      if (currentRewards.length > previousRewards.length) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }

      localStorage.setItem("rewards", JSON.stringify(currentRewards));

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

  const handleSendFood = async (requestId) => {
  try {
    const res = await api.put(`/donor/send-food/${requestId}`);
    alert("Marked as sent!");

    // Update UI
    setApprovedRequests((prev) =>
      prev.map((req) =>
        req._id === requestId ? { ...req, status: "sent" } : req
      )
    );
  } catch (err) {
    console.error("Failed to mark as sent:", err);
    alert("Failed to send food.");
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
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 space-y-4 hidden lg:block">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Donor Dashboard</h2>
          <p className="text-sm text-gray-600 mt-1">Welcome back, {data.donorName}!</p>
          <p className="text-sm text-yellow-600 mt-1">
  🏅 Level: {data.rewardPoints >= 50 ? "Gold Donor" : data.rewardPoints >= 20 ? "Silver Donor" : "Supporter"}
</p>

        </div>
        
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 font-medium text-sm ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 shadow-sm border-l-4 border-blue-500"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <tab.icon className="w-5 h-5 mr-3" />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Sidebar Stats Summary */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Quick Stats</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Donations:</span>
              <span className="font-bold text-blue-600">{data.stats?.totalDonations || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Completed:</span>
              <span className="font-bold text-green-600">{data.stats?.completed || 0}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button className="p-2 bg-white rounded-lg shadow-md">
          <LayoutDashboard className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {showConfetti && <Confetti width={width} height={height} />}


      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Welcome Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Welcome Back, {data.donorName || "Donor"}!
              </h1>
              <p className="text-gray-600 text-lg">
                Thank you for making a difference in our community 🙌
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

            {/* CTA Section */}
            <Card className="p-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="text-center sm:text-left mb-4 sm:mb-0">
                  <h3 className="text-2xl font-bold mb-2">Ready to Make Another Impact?</h3>
                  <p className="text-blue-100">
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

            {/* Impact Summary */}
            {myDonations.length > 0 && (
              <Card className="p-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Your Community Impact</h4>
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
            )}
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Donation Analytics</h2>
              <p className="text-gray-600">Visual breakdown of your contribution status</p>
            </div>
            
            <Card className="p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Donation Statistics</h3>
                  <p className="text-gray-600">Track your contribution patterns</p>
                </div>
              </div>
              <div className="h-96">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </Card>
          </motion.div>
        )}

        {/* My Donations Tab */}
        {activeTab === "donations" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">My Donations</h2>
                <p className="text-gray-600">Track and manage all your contributions</p>
              </div>
              <Button
                onClick={() => navigate("/donor/create")}
                className="inline-flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Donation
              </Button>
            </div>

            {myDonations.length === 0 ? (
              <Card className="p-12 text-center hover:shadow-lg transition-all duration-300">
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
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        )}

        {/* Approved Requests Tab */}
        {activeTab === "requests" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Approved Food Requests</h2>
              <p className="text-gray-600">Recipients who have requested food and were approved</p>
            </div>

            {approvedRequests.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HandHeart className="w-12 h-12 text-gray-400" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">No approved requests yet</h4>
                <p className="text-gray-600 max-w-md mx-auto">
                  When recipients submit food requests and get approved, they'll appear here.
                </p>
              </Card>
            ) : (
              <Card className="p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                      <h3 className="text-2xl font-bold text-gray-900">Active Requests</h3>
                      <p className="text-gray-600 text-sm">{approvedRequests.length} approved request{approvedRequests.length !== 1 ? 's' : ''}</p>
                    <p className="text-gray-600">{approvedRequests.length} approved request{approvedRequests.length !== 1 ? 's' : ''}</p>
                  </div>
                  <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Live Updates</span>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        <th className="px-6 py-4 border-b border-gray-200">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span>Recipient</span>
                          </div>
                        </th>
                        <th className="px-6 py-4 border-b border-gray-200">
                          <div className="flex items-center space-x-2">
                            <Package className="w-4 h-4 text-gray-500" />
                            <span>Items Needed</span>
                          </div>
                        </th>
                        <th className="px-6 py-4 border-b border-gray-200">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span>Address</span>
                          </div>
                        </th>
                        <th className="px-6 py-4 border-b border-gray-200">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-gray-500" />
                            <span>Status</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {approvedRequests.map((req) => (
                        <tr key={req._id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group">
                          <td className="px-6 py-5 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                                <Users className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900 text-sm">
                                  {req.recipientId?.username || "N/A"}
                                </div>
                                <div className="text-xs text-gray-500">Verified Recipient</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-sm text-gray-700">
                            <div className="max-w-xs">
                              <div className="font-medium text-gray-900 mb-1">{req.neededItems}</div>
                              <div className="text-xs text-gray-500">Essential items</div>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-sm text-gray-700">
                            <div className="flex items-start space-x-2 max-w-xs">
                              <MapPin className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <div className="font-medium text-gray-900">{req.address}</div>
                                <div className="text-xs text-gray-500">Delivery location</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-2">
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
      req.status === "sent" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
    }`}
  >
    {req.status}
  </span>
  {req.status === "approved" && (
    <button
      onClick={() => handleSendFood(req._id)}
      className="ml-2 px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Send Food
    </button>
  )}
</td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Enhanced Footer */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span>Active</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>Updated just now</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                      <span className="text-blue-600 font-medium">
                        {approvedRequests.length} total requests
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </motion.div>
        )}

        {activeTab === "rewards" && (
  <Card className="p-6">
    <h2 className="text-xl font-bold text-gray-800 mb-4">My Rewards</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      {data.rewards?.length > 0 ? (
        data.rewards.map((reward, idx) => (
          <div
            key={idx}
            className="p-4 border border-purple-200 bg-purple-50 rounded-lg text-center shadow-sm"
          >
            <Award className="w-6 h-6 mx-auto text-purple-600 mb-2" />
            <p className="text-md font-semibold text-purple-700">{reward}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 col-span-full">No rewards unlocked yet.</p>
      )}
    </div>

    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
      <p className="text-lg text-green-700 font-bold">
        🎁 You have <span className="text-2xl">{data.rewardPoints || 0}</span> reward points!
      </p>
    </div>

    <div className="mt-6 text-center">
  <Button
    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
    onClick={() => alert("Reward redemption coming soon!")}
  >
    🎁 Redeem Rewards
  </Button>
</div>
  </Card>
)}



      </main>
    </div>
  );
};

export default DonorDashboard;