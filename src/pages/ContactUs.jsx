import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle, User, MessageSquare, Heart, Star, Globe, Users } from "lucide-react";
import axios from "axios";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await axios.post("/api/contact", formData);
      if (res.data.success) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "support@rescuebites.com",
      description: "We'll respond within 24 hours",
      color: "text-orange-500",
      bgColor: "bg-orange-100",
      borderColor: "border-orange-200"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Uttar Pradesh, India",
      description: "India",
      color: "text-purple-500",
      bgColor: "bg-purple-100",
      borderColor: "border-purple-200"
    },
    {
      icon: Clock,
      title: "Response Time",
      content: "< 24 Hours",
      description: "Average response time",
      color: "text-orange-500",
      bgColor: "bg-orange-100",
      borderColor: "border-orange-200"
    }
  ];

  const features = [
    { icon: Heart, text: "Dedicated Support Team" },
    { icon: Star, text: "5-Star Customer Service" },
    { icon: Globe, text: "Available Across India" },
    { icon: Users, text: "Community-Driven Platform" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50 to-pink-50 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-200/20 to-orange-200/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-gradient-to-r from-orange-200/20 to-indigo-200/20 rounded-full blur-2xl"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-8 h-8 bg-orange-200/50 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-purple-200/50 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-32 left-32 w-10 h-10 bg-indigo-200/50 rounded-full animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-3xl shadow-2xl mb-6 transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 rounded-3xl animate-pulse"></div>
              <MessageSquare className="w-10 h-10 text-white drop-shadow-lg relative z-10" />
            </div>
            
            <div className="inline-flex items-center gap-2 bg-orange-100/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-orange-200/50">
              <Heart className="w-4 h-4 text-orange-600" />
              <span className="text-orange-700 font-semibold text-sm">We're Here to Help</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight">
              Contact Us
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-6">
              Have questions about <span className="font-bold text-orange-600">RescueBites</span>? 
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
                  <feature.icon className="w-4 h-4 text-orange-500" />
                  <span className="text-gray-700 font-medium text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6 lg:p-8 hover:shadow-3xl transition-all duration-500">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h3>
                  <p className="text-gray-600">Choose your preferred way to reach us</p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className={`p-4 rounded-2xl border-2 ${info.borderColor} ${info.bgColor} hover:shadow-lg transition-all duration-300 group cursor-pointer hover:scale-105`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 ${info.bgColor} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300`}>
                          <info.icon className={`w-6 h-6 ${info.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1">{info.title}</h4>
                          <p className="font-semibold text-gray-800 mb-1">{info.content}</p>
                          <p className="text-sm text-gray-600">{info.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Additional Info */}
                <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-indigo-50 rounded-2xl border border-orange-100">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    Why Contact Us?
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      Technical support and troubleshooting
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      Partnership and collaboration opportunities
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      Feedback and feature requests
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      General inquiries about our mission
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden hover:shadow-3xl transition-all duration-500">
                {/* Form Header */}
                <div className="p-6 lg:p-8 bg-gradient-to-r from-orange-500 via-red-400 to-pink-500 relative overflow-hidden">
                  {/* Decorative Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full animate-pulse"></div>
                    <div className="absolute top-8 right-8 w-6 h-6 border-2 border-white rounded-full animate-pulse delay-300"></div>
                    <div className="absolute bottom-6 left-8 w-4 h-4 border-2 border-white rounded-full animate-pulse delay-700"></div>
                    <div className="absolute bottom-4 right-4 w-10 h-10 border-2 border-white rounded-full animate-pulse delay-500"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm shadow-lg">
                        <Send className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white">Send us a Message</h3>
                        <p className="text-white/80 text-sm">We'll get back to you within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Content */}
                <div className="p-6 lg:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-200" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-gray-50/50 hover:bg-white group-hover:shadow-md text-gray-900 placeholder-gray-500"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Email Input */}
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-200" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-gray-50/50 hover:bg-white group-hover:shadow-md text-gray-900 placeholder-gray-500"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Message Textarea */}
                    <div className="relative group">
                      <div className="absolute top-4 left-4 pointer-events-none">
                        <MessageSquare className="w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-200" />
                      </div>
                      <textarea
                        name="message"
                        placeholder="Your Message"
                        rows="5"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-gray-50/50 hover:bg-white group-hover:shadow-md text-gray-900 placeholder-gray-500 resize-none"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.98 }}
                      disabled={status === "sending"}
                      className="w-full bg-gradient-to-r from-orange-500 via-red-400 to-pink-500 text-white py-4 px-8 rounded-2xl flex items-center justify-center gap-3 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none font-semibold text-lg relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {status === "sending" ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>

                    {/* Status Messages */}
                    {status === "sent" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 p-4 bg-green-50 border border-green-200 rounded-2xl"
                      >
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <p className="text-green-700 font-medium">Message sent successfully!</p>
                      </motion.div>
                    )}
                    
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 p-4 bg-red-50 border border-red-200 rounded-2xl"
                      >
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <p className="text-red-700 font-medium">Failed to send message. Please try again.</p>
                      </motion.div>
                    )}
                  </form>

                  {/* Form Footer */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span>Your privacy is important to us. We'll never share your information.</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm px-8 py-4 rounded-full shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-gray-700 font-semibold">Powered by Community</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-700 font-semibold">Built with Care</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-700 font-semibold">Always Here to Help</span>
            </div>
            
            <p className="text-gray-600 text-sm mt-4 max-w-md mx-auto">
              Join thousands of users who trust RescueBites to make a difference in their communities
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;