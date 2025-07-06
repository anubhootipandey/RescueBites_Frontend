import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Heart,
  TrendingUp,
  AlertCircle,
  BarChart3,
  PieChart,
  Settings,
  Menu,
  X,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import {
  getAdminDashboard,
  getAllRequests,
  getAllDonations,
  updateRequestStatus,
} from "../../services/adminService";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import api from "../../utils/api";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [donationList, setDonationList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [loadingDonations, setLoadingDonations] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pieData = [
  { name: "Pending", value: dashboardData?.requestStats?.pending || 0 },
  { name: "Approved", value: dashboardData?.requestStats?.approved || 0 },
  { name: "Rejected", value: dashboardData?.requestStats?.rejected || 0 },
];

const COLORS = ["#FBBF24", "#10B981", "#EF4444"]; // yellow, green, red

const barData = [
  {
    name: "Requests",
    Pending: dashboardData?.requestStats?.pending || 0,
    Approved: dashboardData?.requestStats?.approved || 0,
    Rejected: dashboardData?.requestStats?.rejected || 0,
  },
];


  // Fetch dashboard data ONCE when the component mounts
  useEffect(() => {
    fetchDashboard();
  }, []);

  // Fetch donations or requests when the tab changes
  useEffect(() => {
    if (activeTab === "donations") fetchDonations();
    if (activeTab === "requests") fetchRequests();
  }, [activeTab]);

  const fetchDashboard = async () => {
    try {
      const res = await getAdminDashboard();
      console.log("Dashboard Data:", res.data); // Debugging
      setDashboardData(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard");
    }
  };

  const fetchDonations = async () => {
    try {
      setLoadingDonations(true);
      const res = await getAllDonations();
      setDonationList(res.data);
    } catch (err) {
      toast.error("Failed to load donations");
    } finally {
      setLoadingDonations(false);
    }
  };

  const fetchRequests = async () => {
    try {
      setLoadingRequests(true);
      const res = await getAllRequests();
      setRequestList(res.data);
    } catch (err) {
      toast.error("Failed to load requests");
    } finally {
      setLoadingRequests(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateRequestStatus(id, status);
      toast.success(`Request ${status} successfully!`);
      fetchRequests();
      fetchDashboard(); //  Update stats after change
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: BarChart3,
      gradient: "from-blue-500 to-purple-500",
    },
    {
      id: "users",
      label: "Users",
      icon: Users,
      gradient: "from-green-500 to-teal-500",
    },
    {
      id: "donations",
      label: "Donations",
      icon: Heart,
      gradient: "from-pink-500 to-red-500",
    },
    {
      id: "requests",
      label: "Requests",
      icon: AlertCircle,
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: PieChart,
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      id: "profile",
      label: "My Profile",
      icon: Users,
      gradient: "from-blue-400 to-indigo-500",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      gradient: "from-gray-500 to-gray-600",
    },
  ];

  const stats = [
    {
      title: "Total Users",
      value: dashboardData?.totalUsers || 0,
      icon: Users,
      gradient: "from-blue-500 to-purple-500",
      changeType: "positive",
    },
    {
      title: "Total Donations",
      value: dashboardData?.totalDonations || 0,
      icon: Heart,
      gradient: "from-pink-500 to-red-500",
      changeType: "positive",
    },
    {
      title: "Pending Requests",
      value: dashboardData?.requestStats?.pending || 0,
      icon: AlertCircle,
      gradient: "from-yellow-500 to-orange-500",
      changeType: "negative",
    },
    {
      title: "Approved Requests",
      value: dashboardData?.requestStats?.approved || 0,
      icon: TrendingUp,
      gradient: "from-green-500 to-teal-500",
      changeType: "positive",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: 0 }}
        className="hidden lg:block w-72 h-full bg-white shadow-2xl relative z-50"
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
              <p className="text-sm text-gray-500">Dashboard Control</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center w-full px-4 py-3 text-left rounded-xl transition-all duration-200 group ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-lg shadow-blue-100"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`p-2 rounded-lg mr-3 transition-all duration-200 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg`
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                }`}
              >
                <tab.icon className="w-4 h-4" />
              </div>
              <span className="font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <ChevronRight className="w-4 h-4 ml-auto" />
              )}
            </motion.button>
          ))}
        </nav>
      </motion.aside>

      {/* Mobile Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="fixed lg:hidden w-72 h-full bg-white shadow-xl z-50"
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
                <p className="text-sm text-gray-500">Dashboard Control</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSidebarOpen(false);
              }}
              className={`flex items-center w-full px-4 py-3 text-left rounded-xl transition-all duration-200 group ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-lg shadow-blue-100"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`p-2 rounded-lg mr-3 transition-all duration-200 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg`
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                }`}
              >
                <tab.icon className="w-4 h-4" />
              </div>
              <span className="font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <ChevronRight className="w-4 h-4 ml-auto" />
              )}
            </motion.button>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 capitalize">
                {activeTab === "overview" ? "Dashboard Overview" : activeTab}
              </h1>
              <p className="text-gray-600 mt-1">
                {activeTab === "overview"
                  ? "Welcome back! Here's what's happening."
                  : `Manage ${activeTab} efficiently`}
              </p>
            </div>
          </div>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, i) => (
                    <Card
                      key={i}
                      className="p-6 relative overflow-hidden group"
                      hoverable
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 font-medium">
                            {stat.title}
                          </p>
                          <p className="text-3xl font-bold text-gray-800">
                            {stat.value.toLocaleString()}
                          </p>
                        </div>
                        <div
                          className={`p-3 rounded-2xl bg-gradient-to-r ${stat.gradient} shadow-lg`}
                        >
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      />
                    </Card>
                  ))}
                </div>

                {/* Additional Overview Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <Button
                        onClick={() => setActiveTab("donations")}
                        className="w-full justify-start"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        View All Donations
                      </Button>
                      <Button
                        onClick={() => setActiveTab("requests")}
                        variant="secondary"
                        className="w-full justify-start"
                      >
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Review Pending Requests
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            )}

       {activeTab === "donations" && (
  <Card className="p-6">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-semibold text-gray-800">
        All Donations
      </h3>
      <Button onClick={fetchDonations} disabled={loadingDonations}>
        {loadingDonations ? (
          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <RefreshCw className="w-4 h-4 mr-2" />
        )}
        Refresh
      </Button>
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Food Item
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Donor
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {loadingDonations ? (
            <tr>
              <td colSpan="5" className="px-6 py-8 text-center">
                <div className="flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 animate-spin text-gray-400 mr-2" />
                  <span className="text-gray-500">
                    Loading donations...
                  </span>
                </div>
              </td>
            </tr>
          ) : donationList.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                <div className="flex flex-col items-center">
                  <Heart className="w-12 h-12 text-gray-300 mb-2" />
                  <span>No donations found.</span>
                </div>
              </td>
            </tr>
          ) : (
            donationList.map((donation, index) => (
              <motion.tr
                key={donation._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {donation.foodType || "—"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {donation.quantity || "—"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {donation.location || "—"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      donation.status === "available"
                        ? "bg-green-100 text-green-800"
                        : donation.status === "requested"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {donation.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <div className="font-medium">
                    {donation.donor?.username || "N/A"}
                  </div>
                  <div className="text-xs text-gray-400">
                    {donation.donor?.email || ""}
                  </div>
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </Card>
)}


            {activeTab === "requests" && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    All Food Requests
                  </h3>
                  <Button onClick={fetchRequests} disabled={loadingRequests}>
                    {loadingRequests ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4 mr-2" />
                    )}
                    Refresh
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Recipient
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Items
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Address
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loadingRequests ? (
                        <tr>
                          <td colSpan="5" className="px-6 py-8 text-center">
                            <div className="flex items-center justify-center">
                              <RefreshCw className="w-6 h-6 animate-spin text-gray-400 mr-2" />
                              <span className="text-gray-500">
                                Loading requests...
                              </span>
                            </div>
                          </td>
                        </tr>
                      ) : requestList.length === 0 ? (
                        <tr>
                          <td
                            colSpan="5"
                            className="px-6 py-8 text-center text-gray-500"
                          >
                            <div className="flex flex-col items-center">
                              <AlertCircle className="w-12 h-12 text-gray-300 mb-2" />
                              <span>No requests found.</span>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        requestList.map((req, index) => (
                          <motion.tr
                            key={req._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {req.recipientId?.username || "N/A"}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-500 max-w-xs truncate">
                                {req.neededItems}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-500 max-w-xs truncate">
                                {req.address}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  req.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : req.status === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {req.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="success"
                                  onClick={() =>
                                    handleStatusUpdate(req._id, "approved")
                                  }
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() =>
                                    handleStatusUpdate(req._id, "rejected")
                                  }
                                >
                                  Reject
                                </Button>
                              </div>
                            </td>
                          </motion.tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}

            {activeTab === "users" && (
  <Card className="p-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-6">All Users</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Member Since</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {dashboardData?.users?.map((user, index) => (
            <motion.tr
              key={user._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="hover:bg-gray-50"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-700">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Never"}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
)}

{activeTab === "analytics" && (
  <Card className="p-6 mt-8">
    <h3 className="text-xl font-semibold text-gray-800 mb-6">Trends</h3>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-xl shadow border">
        <h4 className="text-md font-medium mb-4 text-gray-700">Donations Over Time</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dashboardData?.donationTrends || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#3B82F6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-xl shadow border">
        <h4 className="text-md font-medium mb-4 text-gray-700">New Users Per Month</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dashboardData?.userTrends || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#8B5CF6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </Card>
)}





            {/* Placeholder for other tabs */}
            {["settings"].includes(activeTab) && (
              <Card className="p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="mb-6">
                    {activeTab === "settings" && (
                      <Settings className="w-16 h-16 mx-auto text-gray-300" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 capitalize">
                    {activeTab} Section
                  </h3>
                  <p className="text-gray-600">
                    This section is under development. More features coming
                    soon!
                  </p>
                </div>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
