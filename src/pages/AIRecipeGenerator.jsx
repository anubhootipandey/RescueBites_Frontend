import React, { useState } from 'react';
import { ChefHat, Sparkles, Clock, Users, Utensils, ArrowRight, Star, Heart, Zap, Award, TrendingUp } from 'lucide-react';
import api from '../utils/api';

const AIRecipeGenerator = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!ingredients.trim()) {
      alert('Please enter some ingredients first!');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/recipes/generate', {
        ingredients: ingredients.split(',').map(item => item.trim()).filter(item => item.length > 0)
      });
      setRecipe(res.data.recipe);
    } catch (err) {
      alert('Failed to generate recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleGenerate();
    }
  };

  const popularIngredients = [
    { name: 'Rice', color: 'bg-orange-100 text-orange-700 border-orange-200' },
    { name: 'Vegetables', color: 'bg-green-100 text-green-700 border-green-200' },
    { name: 'Pasta', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { name: 'Dal', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    { name: 'Cheese', color: 'bg-purple-100 text-purple-700 border-purple-200' }
  ];

  const features = [
    { icon: Zap, title: 'Instant Results', desc: 'Get recipes in seconds' },
    { icon: Award, title: 'Chef Quality', desc: 'Professional-grade recipes' },
    { icon: TrendingUp, title: 'Trending Flavors', desc: 'Popular combinations' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/40 to-red-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-200/40 to-orange-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-gradient-to-r from-yellow-200/30 to-orange-200/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-gradient-to-r from-red-200/30 to-pink-200/30 rounded-full blur-2xl"></div>
        
        {/* Floating Food Icons */}
        <div className="absolute top-20 left-20 w-8 h-8 bg-orange-200/50 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-red-200/50 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-32 left-32 w-10 h-10 bg-pink-200/50 rounded-full animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-3xl shadow-2xl mb-6 transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 rounded-3xl animate-pulse"></div>
              <ChefHat className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-lg relative z-10" />
            </div>
            
            <div className="inline-flex items-center gap-2 bg-orange-100/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-orange-200/50">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span className="text-orange-700 font-semibold text-sm">AI-Powered Recipe Generator</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight">
              Transform Leftovers into
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl">Delicious Meals</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-6">
              Turn your leftover ingredients into <span className="font-bold text-orange-600">amazing recipes</span> with our AI chef. 
              No more food waste, just delicious possibilities!
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
                  <feature.icon className="w-4 h-4 text-orange-500" />
                  <span className="text-gray-700 font-medium text-sm">{feature.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Card */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden hover:shadow-3xl transition-all duration-500">
            {/* Input Section */}
            <div className="p-6 sm:p-8 bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 relative overflow-hidden">
              {/* Enhanced Decorative Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-8 w-6 h-6 border-2 border-white rounded-full animate-pulse delay-300"></div>
                <div className="absolute bottom-6 left-8 w-4 h-4 border-2 border-white rounded-full animate-pulse delay-700"></div>
                <div className="absolute bottom-4 right-4 w-10 h-10 border-2 border-white rounded-full animate-pulse delay-500"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-white rounded-full animate-pulse delay-1000"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm shadow-lg">
                    <Utensils className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">What's in your kitchen?</h2>
                    <p className="text-white/80 text-sm">List your ingredients and watch the magic happen</p>
                  </div>
                </div>
                
                {/* Popular Ingredients */}
                <div className="mb-6">
                  <p className="text-white/90 text-sm font-medium mb-3">Popular ingredients:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularIngredients.map((ingredient, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const current = ingredients ? ingredients + ', ' : '';
                          setIngredients(current + ingredient.name.toLowerCase());
                        }}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30 hover:bg-white/30 transition-all duration-200 hover:scale-105"
                      >
                        {ingredient.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="relative group">
                  <textarea
                    className="w-full p-6 border-0 rounded-2xl shadow-2xl bg-white/95 backdrop-blur-sm text-gray-900 placeholder-gray-500 resize-none focus:outline-none focus:ring-4 focus:ring-white/50 focus:bg-white transition-all duration-300 group-hover:shadow-3xl text-lg"
                    rows={4}
                    placeholder="Enter your leftover ingredients, separated by commas...&#10;e.g., Dal, rice, garlic, Roti"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <div className="absolute bottom-4 right-4 text-xs text-gray-400 bg-white/90 px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                    <kbd className="font-mono bg-gray-100 px-1 rounded">Ctrl</kbd> + <kbd className="font-mono bg-gray-100 px-1 rounded">Enter</kbd> to generate
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={loading || !ingredients.trim()}
                  className="mt-6 w-full bg-white text-gray-800 font-bold py-5 px-8 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 group relative overflow-hidden text-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-3 border-orange-500 border-t-transparent"></div>
                      <span>Generating your recipe...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6 text-orange-500 group-hover:animate-pulse" />
                      <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent font-bold">Generate Recipe</span>
                      <ArrowRight className="w-6 h-6 text-pink-500 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Results Section */}
            {recipe && (
              <div className="p-6 sm:p-8 bg-gradient-to-b from-gray-50/90 to-white/90 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Your AI-Generated Recipe</h3>
                    <p className="text-gray-600 text-sm">Crafted just for your ingredients</p>
                  </div>
                  <Heart className="w-7 h-7 text-rose-400 hover:text-rose-500 cursor-pointer transition-all duration-200 hover:scale-110" />
                </div>
                
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100/50 overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="p-6 sm:p-8">
                    <div className="prose max-w-none">
                      <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-base sm:text-lg font-medium">
                        {recipe}
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Recipe Stats */}
                  <div className="bg-gradient-to-r from-orange-50/80 to-red-50/80 px-6 sm:px-8 py-5 border-t border-gray-100/50">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-orange-100">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className="font-semibold text-gray-700 text-sm">Quick & Easy</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-red-100">
                        <Users className="w-4 h-4 text-red-500" />
                        <span className="font-semibold text-gray-700 text-sm">Perfect for leftovers</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-pink-100">
                        <Sparkles className="w-4 h-4 text-pink-500" />
                        <span className="font-semibold text-gray-700 text-sm">AI-Powered</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button
                    onClick={() => setRecipe('')}
                    className="flex-1 bg-gray-100/90 backdrop-blur-sm text-gray-700 font-semibold py-4 px-6 rounded-2xl hover:bg-gray-200/90 transition-all duration-200 border border-gray-200/50 hover:shadow-lg hover:scale-[1.02]"
                  >
                    Clear Recipe
                  </button>
                  <button
                    onClick={handleGenerate}
                    className="flex-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-2xl hover:from-orange-600 hover:via-red-600 hover:to-pink-600 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300"
                  >
                    Generate Another Recipe
                  </button>
                </div>
              </div>
            )}

            {/* Enhanced Loading State */}
            {loading && (
              <div className="p-6 sm:p-8 bg-gradient-to-b from-orange-50/90 to-white/90 backdrop-blur-sm border-t border-gray-100/50">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-400 via-red-400 to-pink-500 rounded-3xl shadow-2xl mb-6 relative overflow-hidden">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-400 to-pink-500 rounded-3xl animate-pulse opacity-50"></div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Cooking up something special...</h3>
                  <p className="text-gray-600 text-base sm:text-lg mb-4">Our AI chef is analyzing your ingredients and creating the perfect recipe</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Empty State */}
            {!recipe && !loading && (
              <div className="p-6 sm:p-8 bg-gradient-to-b from-gray-50/90 to-white/90 backdrop-blur-sm border-t border-gray-100/50">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mb-6 shadow-xl relative overflow-hidden">
                    <Utensils className="w-12 h-12 text-gray-400" />
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-red-100/50 rounded-3xl animate-pulse opacity-50"></div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Ready to create something delicious?</h3>
                  <p className="text-gray-600 text-base sm:text-lg mb-6">Enter your leftover ingredients above and let our AI chef work its magic!</p>
                  
                  {/* Quick Start Tips */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-orange-600 font-bold text-sm">1</span>
                      </div>
                      <p className="text-gray-700 text-sm font-medium">List your ingredients</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-red-600 font-bold text-sm">2</span>
                      </div>
                      <p className="text-gray-700 text-sm font-medium">Click generate</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-pink-600 font-bold text-sm">3</span>
                      </div>
                      <p className="text-gray-700 text-sm font-medium">Enjoy your meal!</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Footer */}
          <div className="text-center mt-8 sm:mt-12">
            <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm px-8 py-4 rounded-full shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <span className="text-gray-700 font-semibold">Powered by Advanced AI</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-700 font-semibold">Zero Food Waste</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-700 font-semibold">Infinite Possibilities</span>
            </div>
            
            <p className="text-gray-600 text-sm mt-4 max-w-md mx-auto">
              Join thousands of home chefs who are transforming their leftovers into culinary masterpieces
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecipeGenerator;