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
  RefreshCw,
  ChevronDown,
  Timer,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Card from "../ui/Card";
import {
  getAvailableDonations,
  getRecipientDashboard,
} from "../../services/recipientService";
import toast from "react-hot-toast";
import RequestFoodForm from "../recipient/RequestFoodForm";
import { claimDonation } from "../../services/recipientService";
import RequestDonationModal from "./RequestDonationModal";

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
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [contactNumber, setContactNumber] = useState("");

  // Enhanced state for donations tab
  const [donationSearchTerm, setDonationSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Enhanced state for requests tab
  const [requestsSortBy, setRequestsSortBy] = useState("newest");
  const [requestsFilterStatus, setRequestsFilterStatus] = useState("all");
  const [showRequestsFilters, setShowRequestsFilters] = useState(false);

  const [requestForm, setRequestForm] = useState({
    name: "",
    contactNumber: "", 
    address: "",
    quantity: "",
  });

  // Function to handle open modal
  const openRequestModal = (donation) => {
    setSelectedDonation(donation);
    setShowRequestModal(true);
  };

  // Function to handle submit
  const submitRequest = async () => {
    if (
      !requestForm.name ||
      !requestForm.contactNumber ||
      !requestForm.address ||
      !requestForm.quantity
    ) {
      return toast.error("Please fill in all fields");
    }
    try {
      await claimDonation(selectedDonation._id, requestForm);
      toast.success("🎉 Request sent successfully!");
      setShowRequestModal(false);
      setRequestForm({ name: "", contactNumber: "", address: "", quantity: "" });
      fetchDashboard();
      fetchDonations();
    } catch (err) {
      toast.error("Failed to send request");
      console.error(err);
    }
  };

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
      fetchDonations();
    }
  }, [activeTab]);

  useEffect(() => {
    fetchDashboard();

    if (location.state?.newRequest) {
      toast.success("🎉 Your food request has been submitted!");
      window.history.replaceState({}, document.title);
      setTimeout(fetchDashboard, 1000);
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

  const handleClaimDonation = async (formData) => {
    try {
      await claimDonation(selectedDonation._id, formData);
      toast.success("🎉 Donation successfully requested!");
      setSelectedDonation(null);
      fetchDonations();
      fetchDashboard();
    } catch (error) {
      toast.error("❌ Failed to request donation");
      console.error(error);
    }
  };

  // Enhanced filtering and sorting for donations
  const getFilteredAndSortedDonations = () => {
    let filtered = donations.filter((donation) => {
      const matchesSearch = donation.foodType.toLowerCase().includes(donationSearchTerm.toLowerCase()) ||
                           donation.category.toLowerCase().includes(donationSearchTerm.toLowerCase()) ||
                           (donation.donorName || donation.donor?.name || "").toLowerCase().includes(donationSearchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || donation.category.toLowerCase() === selectedCategory.toLowerCase();
      
      return matchesSearch && matchesCategory;
    });

    // Sort donations
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "expiring":
          const aExpiry = new Date(new Date(a.createdAt).getTime() + 24 * 60 * 60 * 1000);
          const bExpiry = new Date(new Date(b.createdAt).getTime() + 24 * 60 * 60 * 1000);
          return aExpiry - bExpiry;
        case "quantity":
          return parseInt(b.quantity) - parseInt(a.quantity);
        default:
          return 0;
      }
    });

    return filtered;
  };

  // Enhanced filtering and sorting for requests
  const getFilteredAndSortedRequests = () => {
    let filtered = dashboardData.requests?.filter((request) => {
      const matchesSearch = request.neededItems.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           request.recipientName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = requestsFilterStatus === "all" || 
                           (request.status || "pending").toLowerCase() === requestsFilterStatus.toLowerCase();
      
      return matchesSearch && matchesStatus;
    }) || [];

    // Sort requests
    filtered.sort((a, b) => {
      switch (requestsSortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "status":
          return (a.status || "pending").localeCompare(b.status || "pending");
        case "quantity":
          return parseInt(b.quantity || 0) - parseInt(a.quantity || 0);
        default:
          return 0;
      }
    });

    return filtered;
  };

  // Loading skeleton component
  const DonationSkeleton = () => (
    <Card className="p-5 border-l-4 border-gray-200 shadow animate-pulse">
      <div className="space-y-3">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
      </div>
    </Card>
  );

  const renderDonationsTab = () => {
    const filteredDonations = getFilteredAndSortedDonations();
    const categories = [...new Set(donations.map(d => d.category))];

    return (
      <div className="space-y-6">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Available Donations
            </h2>
            <p className="text-gray-600">
              Discover and request food donations from our community
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchDonations}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              disabled={loadingDonations}
            >
              <RefreshCw className={`w-4 h-4 ${loadingDonations ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <div className="text-sm bg-blue-100 text-blue-800 px-3 py-2 rounded-lg font-medium">
              {filteredDonations.length} Available
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filter Bar */}
        <Card className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search donations by food type, category, or donor..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                value={donationSearchTerm}
                onChange={(e) => setDonationSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="expiring">Expiring Soon</option>
                <option value="quantity">Highest Quantity</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </Card>

        {/* Enhanced Donations Grid */}
        {loadingDonations ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <DonationSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonations.length > 0 ? (
              filteredDonations.map((donation) => {
                const createdAt = new Date(donation.createdAt);
                const expiresAt = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000);
                const now = new Date();
                const timeLeftMs = expiresAt - now;

                const hoursLeft = Math.floor(timeLeftMs / (1000 * 60 * 60));
                const minutesLeft = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));
                const timeLeftString =
                  timeLeftMs > 0
                    ? `${hoursLeft}h ${minutesLeft}m left`
                    : "⛔ Expired (will be removed)";

                const isExpired = timeLeftMs <= 0;
                const isRequested = donation.status === "requested";
                const isUrgent = hoursLeft < 2 && !isExpired;

                return (
                  <Card 
                    key={donation._id} 
                    className={`p-5 border-l-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                      isUrgent ? 'border-red-500 bg-red-50' : 'border-orange-500'
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Header with Priority Badge */}
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          🍱 {donation.foodType}
                        </h3>
                        {isUrgent && (
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                            <Timer className="w-3 h-3" />
                            Urgent
                          </span>
                        )}
                      </div>

                      <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium inline-block">
                        {donation.category}
                      </div>

                      {/* Enhanced Info Grid */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 flex items-center justify-center">👤</span>
                          <span className="text-gray-600">Donor:</span>
                          <span className="font-medium text-gray-800">{donation.donorName || donation.donor?.name}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 flex items-center justify-center">🏢</span>
                          <span className="text-gray-600">Type:</span>
                          <span className="font-medium text-gray-800">{donation.donorType || 'N/A'}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 flex items-center justify-center">⚖️</span>
                          <span className="text-gray-600">Quantity:</span>
                          <span className="font-bold text-orange-600">{donation.quantity}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 flex items-center justify-center">📞</span>
                          <span className="text-gray-600">Contact:</span>
                          <span className="font-medium text-gray-800">{donation.contactNumber || 'N/A'}</span>
                        </div>
                      </div>

                      {/* Enhanced Address */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-start gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-700">Address:</span>
                            <div className="text-gray-600 mt-1">
                              <div>{donation.address?.street}</div>
                              <div>{donation.address?.city}, {donation.address?.state}</div>
                              <div>Pincode: {donation.address?.pincode}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Time Display */}
                      <div className={`flex items-center gap-2 p-2 rounded-lg ${
                        isExpired ? 'bg-red-100' : isUrgent ? 'bg-red-50' : 'bg-blue-50'
                      }`}>
                        <Clock className={`w-4 h-4 ${
                          isExpired ? 'text-red-500' : isUrgent ? 'text-red-600' : 'text-blue-500'
                        }`} />
                        <span className={`text-sm font-medium ${
                          isExpired ? 'text-red-700' : isUrgent ? 'text-red-700' : 'text-blue-700'
                        }`}>
                          {timeLeftString}
                        </span>
                      </div>

                      {/* Enhanced Action Button */}
                      <button
                        onClick={() => setSelectedDonation(donation)}
                        className={`w-full mt-4 px-4 py-3 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                          isRequested || isExpired
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg"
                        }`}
                        disabled={isRequested || isExpired}
                      >
                        {isRequested
                          ? "✅ Already Requested"
                          : isExpired
                          ? "⏰ Expired"
                          : "🤝 Request This Donation"}
                      </button>
                    </div>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Box className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No donations found
                </h3>
                <p className="text-gray-600">
                  {donationSearchTerm || selectedCategory !== "all" 
                    ? "Try adjusting your search or filters" 
                    : "Check back later for new donations"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Enhanced requests filtering
  const enhancedFilteredRequests = getFilteredAndSortedRequests();
  const enhancedTotalPages = Math.ceil(enhancedFilteredRequests.length / itemsPerPage);
  const enhancedPaginatedRequests = enhancedFilteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
              {
                id: "donations",
                label: "Donations List",
                icon: Box,
                color: "orange",
              },
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
                            {dashboardData.latestRequest.address
                              ? `${dashboardData.latestRequest.address.street}, ${dashboardData.latestRequest.address.city}, ${dashboardData.latestRequest.address.state} - ${dashboardData.latestRequest.address.pincode}`
                              : "N/A"}
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

              {/* Enhanced Search and Filter Bar */}
              <Card className="p-4 mb-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search Bar */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search your requests..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Status Filter */}
                  <div className="relative">
                    <select
                      value={requestsFilterStatus}
                      onChange={(e) => setRequestsFilterStatus(e.target.value)}
                      className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Sort */}
                  <div className="relative">
                    <select
                      value={requestsSortBy}
                      onChange={(e) => setRequestsSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="status">By Status</option>
                      <option value="quantity">By Quantity</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </Card>

              {/* Enhanced Table Format for Requests */}
              <Card className="overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {enhancedPaginatedRequests.map((request, index) => (
                        <tr key={request._id} className="hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800">
                            <div className="font-medium">{request.neededItems}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                              {request.quantity || "N/A"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                            {request.recipientName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {request.recipientType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {request.contactNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                              {request.deliveryType}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 max-w-xs">
                            <div className="truncate">
                              {request.address
                                ? `${request.address.street}, ${request.address.city}, ${request.address.state} - ${request.address.pincode}`
                                : "N/A"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                request.status
                              )}`}
                            >
                              {request.status === "completed" && <span className="mr-1">✅</span>}
                              {request.status === "pending" && <span className="mr-1">⏳</span>}
                              {request.status === "in-progress" && <span className="mr-1">🔄</span>}
                              {request.status || "pending"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {new Date(request.createdAt).toLocaleDateString("en-IN")}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(request.createdAt).toLocaleTimeString("en-IN", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Enhanced Pagination */}
              {enhancedTotalPages > 1 && (
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 mt-6">
                  <div className="text-sm text-gray-700">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, enhancedFilteredRequests.length)} of{" "}
                    {enhancedFilteredRequests.length} results
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      Previous
                    </button>
                    
                    {/* Page numbers */}
                    <div className="flex space-x-1">
                      {[...Array(Math.min(5, enhancedTotalPages))].map((_, i) => {
                        const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                        if (page > enhancedTotalPages) return null;
                        
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                              currentPage === page
                                ? "bg-blue-500 text-white"
                                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, enhancedTotalPages))}
                      disabled={currentPage === enhancedTotalPages}
                      className="px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      Next
                    </button>
                  </div>
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

      {/* Global Modal - Rendered at page level to prevent lagging */}
      {selectedDonation && (
        <RequestDonationModal
          donation={selectedDonation}
          onSubmit={handleClaimDonation}
          onClose={() => setSelectedDonation(null)}
        />
      )}
    </div>
  );
};

export default RecipientDashboard;