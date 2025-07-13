import React, { useEffect, useState } from "react";
import {
  Clock,
  Heart,
  Search,
  PlusCircle,
  LayoutDashboard,
  TrendingUp,
  MapPin,
  Calendar,
  Award,
  Menu,
  X,
  Box,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Card from "../ui/Card";
import { getAvailableDonations, getRecipientDashboard } from "../../services/recipientService";
import toast from "react-hot-toast";
import RequestFoodForm from "../recipient/RequestFoodForm";
import { requestFood } from "../../services/recipientService";


const RecipientDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [donations, setDonations] = useState([]);
  const [loadingDonations, setLoadingDonations] = useState(false);
  const itemsPerPage = 6;

  const filteredRequests =
    dashboardData.requests?.filter((r) =>
      r.neededItems.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fetchDashboard = async () => {
    try {
      const res = await getRecipientDashboard();
      setDashboardData(res.data);
    } catch (err) {
      console.error("Failed to load dashboard:", err);
    }
  };

  const fetchDonations = async () => {
  try {
    setLoadingDonations(true);
    const res = await getAvailableDonations();
    setDonations(res.data);
  } catch (err) {
    console.error("Failed to fetch donations", err);
    toast.error("Failed to load donations");
  } finally {
    setLoadingDonations(false);
  }
};

  useEffect(() => {
  if (activeTab === "donations") {
    fetchDonations(); // This is missing in your code currently
  }
}, [activeTab]);

  useEffect(() => {
    fetchDashboard();

    if (location.state?.newRequest) {
      toast.success("🎉 Your food request has been submitted!");
      window.history.replaceState({}, document.title);
      setTimeout(fetchDashboard, 1000); // ✅ Wait to ensure backend stores the request
    }
  }, [location]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const closeSidebar = () => setSidebarOpen(false);

 const handleRequestDonation = async (donation) => {
  console.log("Selected donation:", donation);

  if (!donation?.foodType || !donation?.location) {
    console.warn("Invalid donation payload:", donation);
    return;
  }

  const payload = {
    neededItems: donation.foodType,
    address: donation.location,
    donationId: donation._id,
  };

  console.log("Payload to send:", payload); // For debugging

  try {
    await requestFood({
      neededItems: donation.foodType, 
      address: donation.location,     
      donationId: donation._id,
    });
    toast.success("🎉 Donation request submitted!");
    fetchDashboard();
    fetchDonations();
  } catch (err) {
    toast.error("Failed to request donation");
    console.error(err);
  }
};


  const renderDonationsTab = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Available Donations
      </h2>
      {loadingDonations ? (
        <p className="text-gray-500">Loading donations...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.length > 0 ? (
            donations.map((donation) => (
              <Card
                key={donation._id}
                className="p-5 border-l-4 border-orange-500 shadow"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {donation.foodType}
                </h3>
                <p className="text-sm text-gray-600">
                  Quantity: {donation.quantity}
                </p>
                <p className="text-sm text-gray-600">
                  Donor: {donation.donorName || donation.donor?.name}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  Location: {donation.location}
                </p>
                <button
                  onClick={() => handleRequestDonation(donation)}
                  className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                  Request This
                </button>
              </Card>
            ))
          ) : (
            <p className="text-gray-500">No donations available right now.</p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-xl shadow-lg border border-gray-200 mt-14"
      >
        <Menu className="w-6 h-6 text-gray-600" />
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Enhanced Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 lg:w-72 bg-white shadow-2xl border-r border-gray-100 transform transition-transform duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Mobile Close Button */}
        <button
          onClick={closeSidebar}
          className="lg:hidden absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 lg:p-8 flex-1">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Recipient Panel
              </h2>
              <p className="text-sm text-gray-500">Food assistance dashboard</p>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              {
                id: "overview",
                label: "Overview",
                icon: LayoutDashboard,
                color: "blue",
              },
              {
                id: "requests",
                label: "My Requests",
                icon: Heart,
                color: "pink",
              },
              {
                id: "new",
                label: "Request Food",
                icon: PlusCircle,
                color: "green",
              },
              {
                id: "rewards",
                label: "My Rewards",
                icon: Award,
                color: "purple",
              },
              { id: "donations", label: "Donations List", icon: Box, color: "orange" },
            ].map((item) => (
              <button
                key={item.id}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group ${
                  activeTab === item.id
                    ? `bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 text-white shadow-lg`
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={() => {
                  setActiveTab(item.id);
                  closeSidebar();
                }}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    activeTab === item.id
                      ? "text-white"
                      : `text-${item.color}-500`
                  }`}
                />
                <span className="font-medium">{item.label}</span>
                {activeTab === item.id && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full opacity-80"></div>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Community Points Section - Fixed inside sidebar */}
        <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 mt-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-700">
              Community Points
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {dashboardData.points || 0}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Keep requesting to earn more!
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="flex-1 overflow-auto lg:ml-0">
        <div className="p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8">
          {activeTab === "overview" && (
            <>
              {/* Header Section */}
              <div className="mb-6 lg:mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                  Dashboard Overview
                </h2>
                <p className="text-gray-600 text-base lg:text-lg">
                  Welcome back! Here's your food assistance summary
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-10">
                <Card className="p-4 lg:p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-pink-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-600 text-sm font-medium mb-1">
                        Total Requests
                      </p>
                      <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                        {dashboardData.totalRequests || 0}
                      </p>
                      <div className="flex items-center text-sm text-green-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span>All time</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                      <Heart className="w-5 h-5 lg:w-6 lg:h-6 text-pink-500" />
                    </div>
                  </div>
                </Card>

                <Card className="p-4 lg:p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-yellow-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-600 text-sm font-medium mb-1">
                        Pending
                      </p>
                      <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                        {dashboardData.requests?.filter(
                          (r) => r.status !== "completed"
                        ).length ?? 0}
                      </p>
                      <div className="flex items-center text-sm text-yellow-600">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>In progress</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-500" />
                    </div>
                  </div>
                </Card>

                <Card className="p-4 lg:p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-600 text-sm font-medium mb-1">
                        Community Points
                      </p>
                      <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                        {dashboardData.points || 0}
                      </p>
                      <div className="flex items-center text-sm text-green-600">
                        <Award className="w-4 h-4 mr-1" />
                        <span>Earned</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <span className="text-xl lg:text-2xl">🎯</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 lg:p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-600 text-sm font-medium mb-1">
                        Available Donations
                      </p>
                      <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                        {dashboardData.availableDonationsCount || 0}
                      </p>
                      <div className="flex items-center text-sm text-blue-600">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        <span>Ready to claim</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <span className="text-xl lg:text-2xl">📦</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Enhanced Additional Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <Card className="p-4 lg:p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">⭐</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        Most Requested Item
                      </h4>
                      <p className="text-sm text-gray-500">
                        Your top food preference
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-lg lg:text-xl font-medium text-gray-800">
                      {dashboardData.mostRequestedItem || "No data available"}
                    </p>
                  </div>
                </Card>

                <Card className="p-4 lg:p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        Latest Request
                      </h4>
                      <p className="text-sm text-gray-500">
                        Your most recent submission
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    {dashboardData.latestRequest ? (
                      <>
                        <div className="flex items-start space-x-2">
                          <span className="text-sm font-medium text-gray-600 min-w-[60px]">
                            Items:
                          </span>
                          <span className="text-sm text-gray-800">
                            {dashboardData.latestRequest.neededItems}
                          </span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                          <span className="text-sm text-gray-800">
                            {dashboardData.latestRequest.address}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-600">
                            Status:
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              dashboardData.latestRequest.status
                            )}`}
                          >
                            {dashboardData.latestRequest.status || "pending"}
                          </span>
                        </div>
                      </>
                    ) : (
                      <p className="text-gray-500 text-center py-4">
                        No recent requests found
                      </p>
                    )}
                  </div>
                </Card>
              </div>
            </>
          )}

          {activeTab === "rewards" && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Your Rewards
              </h2>
              <p className="text-gray-600 mb-6">
                Celebrate your contributions with earned points!
              </p>

              <Card className="p-6 mb-6 border-l-4 border-l-purple-500 shadow-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  🎯 Total Points
                </h4>
                <p className="text-4xl font-bold text-purple-700 mb-1">
                  {dashboardData.points || 0}
                </p>
                <p className="text-sm text-gray-500">
                  Earn 10 points for every completed request.
                </p>
              </Card>

              <Card className="p-6 border border-dashed border-purple-300">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  🏆 Milestones
                </h4>
                <ul className="list-disc pl-5 text-gray-700 text-sm space-y-2">
                  <li>10 Points — 🥉 Bronze Contributor</li>
                  <li>30 Points — 🥈 Silver Helper</li>
                  <li>60 Points — 🥇 Gold Giver</li>
                  <li>100+ Points — 💎 Community Hero</li>
                </ul>
              </Card>
            </div>
          )}

          {activeTab === "requests" && (
            <>
              <div className="mb-6 lg:mb-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                  My Food Requests
                </h3>
                <p className="text-gray-600">
                  Track and manage all your food assistance requests
                </p>
              </div>

              {/* Search Bar */}
              <div className="mb-6 lg:mb-8">
                <div className="relative max-w-md">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search your requests..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Table Format for Requests */}
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl shadow">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">
                        #
                      </th>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">
                        Items
                      </th>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">
                        Address
                      </th>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedRequests.map((request, index) => (
                      <tr
                        key={request._id}
                        className="border-t border-gray-100"
                      >
                        <td className="px-6 py-4 text-sm text-gray-800">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800">
                          {request.neededItems}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800">
                          {request.address}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-3 py-1 text-xs rounded-full font-medium border ${getStatusColor(
                              request.status
                            )}`}
                          >
                            {request.status || "pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-8">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-gray-700 font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}

              {/* No Requests Case */}
              {dashboardData.requests?.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No requests yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start by creating your first food request
                  </p>
                  <button
                    onClick={() => {
                      setActiveTab("new");
                      closeSidebar();
                    }}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                  >
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Create Request
                  </button>
                </div>
              )}
            </>
          )}

          {activeTab === "new" && (
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Submit a Food Request
              </h2>
              <RequestFoodForm />
            </div>
          )}

          {activeTab === "donations" && renderDonationsTab()}
        </div>
      </div>
    </div>
  );
};

export default RecipientDashboard;
