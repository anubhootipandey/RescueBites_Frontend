import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Users, 
  Award, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  HandHeart,
  MapPin,
  Clock,
  Shield,
  Star,
  Gift,
  Zap,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import heroImg from "../images/pic1.jpg";
import img1 from "../images/pic2.jpg";
import img2 from "../images/pic4.jpg";
import img3 from "../images/pic5.jpg";
import img4 from "../images/pic6.jpg";
import img5 from "../images/pic3.jpg";
import { getCurrentUser } from '../utils/auth';

const Home = () => {
  const user = getCurrentUser();

let getStartedLink = "/register"; // default for not logged in
if (user) {
  switch (user.role) {
    case "donor":
      getStartedLink = "/donor/create";
      break;
    case "recipient":
      getStartedLink = "/recipient/request";
      break;
    case "admin":
      getStartedLink = "/admin/dashboard";
      break;
    case "guest":
      getStartedLink = "/guest";
      break;
    default:
      getStartedLink = "/dashboard";
  }
}

let donateNowLink = "/register";
if (user) {
  if (user.role === "donor") donateNowLink = "/donor/create";
  else donateNowLink = "/dashboard"; // redirect others to a general dashboard
}

let getStartedText = "Get Started";

if (user) {
  switch (user.role) {
    case "donor":
      getStartedText = "Donate Now";
      break;
    case "recipient":
      getStartedText = "Request Food";
      break;
    case "guest":
      getStartedText = "Explore";
      break;
    case "admin":
      getStartedText = "Go to Dashboard";
      break;
    default:
      getStartedText = "Go to Dashboard";
  }
}



  const realityStats = [
    {
      image: img1,
      title: "Street Children",
      description: "Millions of children live on streets without proper nutrition or shelter",
      stat: "11 Million",
      detail: "Children living on Indian streets"
    },
    {
      image: img3,
      title: "Rural Poverty",
      description: "Rural families struggle with food insecurity and lack of clean water",
      stat: "68.8%",
      detail: "Of India's poor live in rural areas"
    },
    {
      image: img2,
      title: "Urban Slums",
      description: "Urban poor face daily challenges accessing basic necessities",
      stat: "65 Million",
      detail: "People live in urban slums"
    }
  ];

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Hero Section */}
      <section className="relative bg-orange-50 py-20 overflow-hidden">
        <div className="absolute top-10 right-10 w-96 h-96 bg-yellow-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-red-200 rounded-full opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-sm mb-6">
                <Heart className="w-4 h-4 text-red-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Connecting Hearts & Meals</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Give your{' '}
                <span className="text-orange-500">
                  leftovers
                </span>{' '}
                purpose
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join our community-driven platform where surplus food finds its way to those who need it most. 
              Share, discover, and create delicious meals while making a positive impact.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {/* <Link to="/register">
                  <button className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
                    Get Started <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </Link> */}
                <Link to={getStartedLink}>
  <button className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
    {getStartedText} <ArrowRight className="w-4 h-4 ml-2" />
  </button>
</Link>

                <Link to="/about">
                  <button className="bg-white text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 flex items-center justify-center">
                    Learn More
                  </button>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src={heroImg}
                  alt="Food donation"
                  className="w-full h-96 object-cover rounded-3xl shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
                How It Works
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple Steps to <span className="text-orange-500">Make Impact</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform connects food donors with receivers through a simple, rewarding process that benefits everyone involved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8 text-white" />,
                color: 'from-red-500 to-pink-500',
                step: '01',
                title: 'Share Your Surplus',
                text: 'List your surplus food with photos, descriptions, and location. Help reduce waste while helping your community.',
                badge: 'Donate'
              },
              {
                icon: <MapPin className="w-8 h-8 text-white" />,
                color: 'from-orange-500 to-yellow-500',
                step: '02', 
                title: 'Find & Connect',
                text: 'Browse available food donations near you. Claim what you need and coordinate pickup with donors instantly.',
                badge: 'Discover'
              },
              {
                icon: <Award className="w-8 h-8 text-white" />,
                color: 'from-green-500 to-emerald-500',
                step: '03',
                title: 'Earn & Impact',
                text: 'Get points for every donation, claim, and recipe generation. Unlock badges and climb the leaderboard.',
                badge: 'Rewards'
              }
            ].map((feature, index) => (
              <div key={index} className="relative group">
                <Card className="p-8 h-full bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      {feature.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-200">{feature.step}</div>
                      <div className={`bg-gradient-to-r ${feature.color} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                        {feature.badge}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{feature.text}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-red-100 to-orange-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">
                The Reality We Face
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Every Face Has a <span className="text-red-500">Story</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Behind every statistic is a human being with hopes, dreams, and the fundamental need for food and dignity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {realityStats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="overflow-hidden h-full hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                  <div className="relative h-64">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-3xl font-bold mb-1">{item.stat}</div>
                      <div className="text-sm opacity-90">{item.detail}</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-xl mr-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold text-lg">
                  AI-Powered Magic
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Turn Leftovers into <span className="text-orange-500">Delicious Meals</span>
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Our smart AI recipe generator helps you create amazing dishes from ingredients you already have. 
                Reduce waste and discover new favorite recipes with personalized suggestions!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/recipe-generator">
                  <Button size="lg" icon={Sparkles} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Try Recipe AI
                  </Button>
                </Link>
                <div className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm">4.9/5 from 2,500+ users</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: <Zap className="w-5 h-5 text-yellow-500" />, text: 'Instant recipes' },
                  { icon: <Shield className="w-5 h-5 text-green-500" />, text: 'Safe ingredients' },
                  { icon: <Gift className="w-5 h-5 text-purple-500" />, text: 'Surprise dishes' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-2 text-sm text-gray-600">
                    {item.icon}
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-3xl blur-3xl opacity-20"></div>
              <Card className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-0">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">Recipe AI</h3>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    <span className="text-green-500 text-sm font-semibold">Online</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Available Ingredients</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { name: 'Leftover Rice', color: 'bg-yellow-100 text-yellow-800' },
                        { name: 'Vegetables', color: 'bg-green-100 text-green-800' },
                        { name: 'Spices', color: 'bg-red-100 text-red-800' },
                        { name: 'Eggs', color: 'bg-orange-100 text-orange-800' }
                      ].map((ingredient) => (
                        <span key={ingredient.name} className={`${ingredient.color} px-3 py-2 rounded-xl text-sm font-medium`}>
                          {ingredient.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-bold">AI</span>
                      </div>
                      <h4 className="font-bold text-gray-900">Perfect Match Found!</h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      🍳 <strong className="text-orange-600">Veggie Fried Rice</strong> – Transform your leftover rice into a delicious, 
                      colorful meal with fresh vegetables and aromatic spices. Ready in just 15 minutes!
                    </p>
                    <div className="flex items-center mt-4 space-x-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        15 mins
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 mr-1 text-yellow-400" />
                        4.8 rating
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full opacity-5 transform translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full opacity-5 transform -translate-x-32 translate-y-32"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Your Small Act,<br />
                Their <span className="text-yellow-200">Big Hope</span>
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Every meal you share, every rupee you donate, every moment you volunteer 
                creates ripples of change in someone's life. Be the reason someone smiles today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={donateNowLink}>
  <button className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
    <HandHeart className="w-6 h-6 mr-3" />
    Donate Now
  </button>
</Link>

                {/* <Link to="/volunteer">
                  <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300 flex items-center justify-center">
                    <Users className="w-6 h-6 mr-3" />
                    Volunteer
                  </button>
                </Link> */}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src= {img4}
                    alt="Children in need"
                    className="w-full h-32 object-cover rounded-2xl shadow-lg"
                  />
                  <img
                    src={img3}
                    alt="Elderly person"
                    className="w-full h-40 object-cover rounded-2xl shadow-lg"
                  />
                </div>
                <div className="space-y-4 mt-8">
                  <img
                    src={heroImg}
                    alt="Family in need"
                    className="w-full h-40 object-cover rounded-2xl shadow-lg"
                  />
                  <img
                    src={img5}
                    alt="Community support"
                    className="w-full h-32 object-cover rounded-2xl shadow-lg"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="text-center text-white">
                  <Heart className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-semibold">Every face matters</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;