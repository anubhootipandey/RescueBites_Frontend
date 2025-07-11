import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, User, LogOut, Menu, X } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.removeItem('token');
          setUser(null);
          navigate('/login');
        } else {
          setUser(decoded);
        }
      } catch (error) {
        console.error('Invalid token', error);
        localStorage.removeItem('token');
        setUser(null);
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
    setMobileMenuOpen(false);
  };

  const getDashboardPath = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'recipient':
        return '/recipient/dashboard';
      case 'donor':
        return '/donor/dashboard';
      default:
        return '/';
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <motion.header
      className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-amber-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">
                RescueBites
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-600 transition-colors">About</Link>
            <Link to="/recipe-generator" className="text-gray-700 hover:text-purple-600 transition-colors">AI Recipe Generator</Link>
            <Link to="/community" className="text-gray-700 hover:text-purple-600 transition-colors">Community</Link>
          </nav>

          {/* Desktop User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {/* ✅ Profile link available for all roles now */}
                <Link to="/profile">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <User className="w-4 h-4" />
                  </motion.button>
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-500 to-amber-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-amber-600 transition-all shadow-lg"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 py-4"
            >
              <div className="flex flex-col space-y-4 px-2">
                <Link to="/" onClick={closeMobileMenu} className="text-gray-700 hover:text-purple-600 transition-colors">Home</Link>
                <Link to="/about" onClick={closeMobileMenu} className="text-gray-700 hover:text-purple-600 transition-colors">About</Link>
                <Link to="/recipe-generator" onClick={closeMobileMenu} className="text-gray-700 hover:text-purple-600 transition-colors">AI Recipe Generator</Link>
                <Link to="/community" onClick={closeMobileMenu} className="text-gray-700 hover:text-purple-600 transition-colors">Community</Link>

                {user ? (
                  <>
                    <Link to={getDashboardPath()} onClick={closeMobileMenu} className="text-gray-700 hover:text-purple-600">Dashboard</Link>

                    {/* ✅ Profile visible to all roles including admin */}
                    <Link to="/profile" onClick={closeMobileMenu} className="text-gray-700 hover:text-green-600">Profile</Link>

                    <button onClick={handleLogout} className="flex items-center space-x-2 text-red-600 hover:text-red-700">
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={closeMobileMenu} className="text-gray-700 hover:text-purple-600">Login</Link>
                    <Link to="/register" onClick={closeMobileMenu} className="bg-blue-500 text-white py-2 px-4 rounded-lg text-center">Get Started</Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
