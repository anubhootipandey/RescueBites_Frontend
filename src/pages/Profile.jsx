import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProfile, updateProfile } from '../services/userService';
import toast from 'react-hot-toast';
import {
  User, Edit3, Save, X, Settings, LogOut, ArrowRight,
  Mail, Calendar, Clock, Phone,
  CheckCircle, Eye, Heart, Gift, Zap, Target, Crown, Sparkles
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    userType: '',
    otherType: '',
    contactNumber: ''
  });
  const [loading, setLoading] = useState(true);

  const isEditable = profile?.role !== 'guest' && profile?.role !== 'admin';

  useEffect(() => {
    setLoading(true);
    fetchProfile()
      .then(res => {
        const user = res.data;
        setProfile(user);
        setFormData({
          username: user.username || '',
          email: user.email || '',
          userType: user.userType || '',
          otherType: user.otherType || '',
          contactNumber: user.contactNumber || ''
        });
      })
      .catch(() => toast.error('Failed to load profile'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    updateProfile(formData)
      .then(res => {
        setProfile(res.data.user);
        setEditMode(false);
        toast.success(res.data.message);
      })
      .catch(() => toast.error('Failed to update profile'));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const goToDashboard = () => {
    switch (profile.role) {
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'recipient':
        navigate('/recipient/dashboard');
        break;
      case 'donor':
        navigate('/donor');
        break;
      default:
        navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-orange-200 border-t-orange-500 mx-auto mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <User className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Your Profile</h3>
          <p className="text-gray-600">Please wait while we fetch your information...</p>
        </div>
      </div>
    );
  }

  if (!profile) return <p>Loading...</p>;

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-gradient-to-r from-red-500 to-red-600';
      case 'recipient': return 'bg-gradient-to-r from-green-500 to-green-600';
      case 'donor': return 'bg-gradient-to-r from-blue-500 to-blue-600';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <Crown className="w-5 h-5" />;
      case 'recipient': return <Heart className="w-5 h-5" />;
      case 'donor': return <Gift className="w-5 h-5" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full transform translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full transform -translate-x-32 translate-y-32"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-yellow-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-pink-400/20 rounded-full animate-bounce"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl mb-8 shadow-xl">
              <Sparkles className="w-5 h-5 text-yellow-200 mr-2 animate-pulse" />
              <span className="text-white font-semibold text-[16px]">Profile Dashboard</span>
            </div>
            
            <h1 className="text-3xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Welcome Back,
              <span className="text-yellow-200 bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text">
                {profile.username}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Manage your account, track your impact, and continue making a difference in your community
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
          {/* Enhanced Main Profile Card */}
          <div className="lg:col-span-2">
            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
              <div className="p-6">
                {/* Minimal Profile Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white">
                        <CheckCircle className="w-3 h-3 text-white ml-0.5 mt-0.5" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">Profile Information</h2>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium text-white ${getRoleColor(profile.role)}`}>
                          {getRoleIcon(profile.role)}
                          <span className="ml-1">{profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {isEditable && !editMode && (
                    <Button
                      onClick={() => setEditMode(true)}
                      className="bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-200 px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      <Edit3 className="w-4 h-4 mr-1" />
                      Edit Profile
                    </Button>
                  )}
                </div>

                {/* Minimal Profile Form */}
                <div className="space-y-4">
                  {/* Username Field */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 text-gray-500 mr-2" />
                      Username
                    </label>
                    {editMode ? (
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-colors duration-200"
                        placeholder="Enter your username"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="font-medium text-gray-900">{profile.username}</p>
                      </div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 text-gray-500 mr-2" />
                      Email Address
                    </label>
                    {editMode ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-colors duration-200"
                        placeholder="Enter your email"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="font-medium text-gray-900">{profile.email || 'Not Provided'}</p>
                      </div>
                    )}
                  </div>

                  {/* Contact Number Field */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 text-gray-500 mr-2" />
                      Contact Number
                    </label>
                    {editMode ? (
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-colors duration-200"
                        placeholder="Enter your contact number"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="font-medium text-gray-900">{profile.contactNumber || 'Not Provided'}</p>
                      </div>
                    )}
                  </div>

                  {/* User Type Field */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Target className="w-4 h-4 text-gray-500 mr-2" />
                      User Type
                    </label>
                    {editMode ? (
                      <select
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-colors duration-200"
                      >
                        <option value="">Select User Type</option>
                        <option value="individual">Individual</option>
                        <option value="ngo">NGO</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="font-medium text-gray-900 capitalize">
                          {profile.userType || 'Not Provided'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Other Type Field */}
                  {(formData.userType === 'other' || profile.userType === 'other') && (
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Zap className="w-4 h-4 text-gray-500 mr-2" />
                        Other Type Specification
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          name="otherType"
                          value={formData.otherType}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-colors duration-200"
                          placeholder="Specify your type"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="font-medium text-gray-900">
                            {profile.otherType || 'Not Provided'}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {editMode && isEditable && (
                    <div className="flex space-x-3 pt-4 border-t border-gray-200">
                      <Button 
                        onClick={handleSave} 
                        className="bg-green-500 hover:bg-green-600 text-white transition-colors duration-200 flex-1 py-2 rounded-lg font-medium"
                      >
                        <Save className="w-4 h-4 mr-1" />
                        Save Changes
                      </Button>
                      <Button 
                        variant="secondary" 
                        onClick={() => setEditMode(false)} 
                        className="bg-gray-500 hover:bg-gray-600 text-white transition-colors duration-200 flex-1 py-2 rounded-lg font-medium"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-4">
            {/* Account Details */}
            <Card className="relative overflow-hidden p-6 bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 border-2 border-blue-100/50">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <Eye className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Account Details</h3>
                    <p className="text-sm text-gray-600">Your account information</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-100 hover:border-blue-200 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-600">Member since</p>
                      <p className="font-bold text-gray-900 text-[15px]">{new Date(profile.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-100 hover:border-green-200 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-600">Last login</p>
                      <p className="font-bold text-gray-900 text-[15px]">{new Date(profile.lastLogin).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="relative overflow-hidden p-6 bg-gradient-to-br from-white to-orange-50/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 border-2 border-orange-100/50">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100/30 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
                    <p className="text-sm text-gray-600">Navigate to different sections</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <Button 
                    onClick={goToDashboard} 
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 justify-between py-2 rounded-2xl font-bold text-lg transform hover:scale-105"
                  >
                    <div className="flex items-center space-x-3">
                      <Settings className="w-6 h-6" />
                      <span>Go to Dashboard</span>
                    </div>
                    <ArrowRight className="w-6 h-6" />
                  </Button>
                  <Button 
                    onClick={handleLogout} 
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 justify-center py-2 rounded-2xl font-bold text-lg transform hover:scale-105"
                  >
                    <LogOut className="w-6 h-6 mr-3" />
                    <span>Logout</span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;