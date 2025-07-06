import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Users, Award, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-100 via-white to-amber-100 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Fighting Food Waste,{' '}
                <span className="bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">One Bite at a Time</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Join our community-driven platform where surplus food finds its way to those who need it most. Share, discover, and create delicious meals while making a positive impact.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">0+</div>
                <div className="text-gray-600">Meals Rescued</div>
              </Card>
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-amber-600 mb-2">3</div>
                <div className="text-gray-600">Active Users</div>
              </Card>
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">0%</div>
                <div className="text-gray-600">Success Rate</div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How RescueBites Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform connects food donors with receivers through a simple,
              rewarding process that benefits everyone involved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              icon: <Heart className="w-8 h-8 text-white" />, color: 'from-blue-500 to-blue-600',
              title: 'Donate Food',
              text: 'List your surplus food with photos, descriptions, and location. Help reduce waste while helping your community.',
              points: ['Easy listing process', 'Photo uploads', 'Location tracking']
            }, {
              icon: <Users className="w-8 h-8 text-white" />, color: 'from-amber-500 to-amber-600',
              title: 'Find & Claim',
              text: 'Browse available food donations near you. Claim what you need and coordinate pickup with donors.',
              points: ['Location-based search', 'Real-time availability', 'Easy communication']
            }, {
              icon: <Award className="w-8 h-8 text-white" />, color: 'from-green-500 to-green-600',
              title: 'Earn Rewards',
              text: 'Get points for every donation, claim, and recipe generation. Unlock badges and climb the leaderboard.',
              points: ['Points system', 'Achievement badges', 'Community leaderboard']
            }].map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                <Card className="text-center p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 mb-6">{feature.text}</p>
                  <div className="space-y-2 text-left">
                    {feature.points.map((point, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        {point}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Recipe Generator Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <div className="flex items-center mb-4">
                <Sparkles className="w-6 h-6 text-blue-500 mr-2" />
                <span className="text-blue-600 font-medium">AI-Powered</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Turn Leftovers into Delicious Meals</h2>
              <p className="text-xl text-gray-600 mb-8">
                Our AI recipe generator helps you create amazing dishes from ingredients you already have.
                Reduce waste and discover new favorite recipes!
              </p>
              <Link to="/recipe-generator">
                <Button size="lg" icon={Sparkles}>Try Recipe Generator</Button>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Recipe Generator</h3>
                  <Sparkles className="w-5 h-5 text-blue-500" />
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available Ingredients</label>
                    <div className="flex flex-wrap gap-2">
                      {['Leftover Boiled Potatoes', 'Poha (Flattened Rice)', 'Onion', 'Mustard Seeds', 'Curry Leaves'].map((ingredient) => (
                        <span key={ingredient} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{ingredient}</span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Suggested Recipe:</h4>
                    <p className="text-gray-600 text-sm">
                      🥣 <strong>Aloo Poha</strong> – A popular and quick Indian breakfast made by tossing leftover boiled potatoes with soaked poha,
                      onions, curry leaves, and mild spices for a light and satisfying dish.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-amber-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of users who are already fighting food waste and building stronger communities.
            </p>
            <Link to="/register">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-blue-400/20 text-white hover:bg-blue-300/20">Start Your Journey Today</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
