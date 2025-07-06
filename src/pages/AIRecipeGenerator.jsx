import React, { useState } from 'react';
import { ChefHat, Sparkles, Clock, Users, Utensils, ArrowRight, Star, Heart } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-orange-50 to-amber-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-rose-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-amber-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-amber-500 rounded-3xl shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
              <ChefHat className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-lg" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-500 to-amber-500 bg-clip-text text-transparent mb-4 leading-tight">
              AI Leftover Recipe Generator
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Transform your leftover ingredients into <span className="font-semibold text-orange-600">delicious meals</span> with AI-powered recipe suggestions
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Star className="w-5 h-5 text-amber-400 fill-current" />
              <Star className="w-5 h-5 text-amber-400 fill-current" />
              <Star className="w-5 h-5 text-amber-400 fill-current" />
              <Star className="w-5 h-5 text-amber-400 fill-current" />
              <Star className="w-5 h-5 text-amber-400 fill-current" />
              <span className="ml-2 text-sm text-gray-600 font-medium">Loved by home chefs</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            {/* Input Section */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-blue-500 to-amber-500 relative overflow-hidden">
              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
                <div className="absolute top-8 right-8 w-6 h-6 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-6 left-8 w-4 h-4 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-10 h-10 border-2 border-white rounded-full"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Utensils className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">What's in your kitchen?</h2>
                </div>
                
                <div className="relative group">
                  <textarea
                    className="w-full p-6 border-0 rounded-2xl shadow-2xl bg-white/95 backdrop-blur-sm text-gray-900 placeholder-gray-500 resize-none focus:outline-none focus:ring-4 focus:ring-white/40 focus:bg-white transition-all duration-300 group-hover:shadow-3xl"
                    rows={4}
                    placeholder="Enter your leftover ingredients, separated by commas...&#10;e.g., chicken breast, broccoli, rice, garlic, soy sauce"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <div className="absolute bottom-4 right-4 text-xs text-gray-400 bg-white/90 px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                    <kbd className="font-mono">Ctrl</kbd> + <kbd className="font-mono">Enter</kbd> to generate
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={loading || !ingredients.trim()}
                  className="mt-6 w-full bg-white text-gray-800 font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-rose-400 to-pink-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-3 border-orange-500 border-t-transparent"></div>
                      <span className="text-lg">Generating your recipe...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6 text-orange-500 group-hover:animate-pulse" />
                      <span className="text-lg bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">Generate Recipe</span>
                      <ArrowRight className="w-6 h-6 text-pink-500 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Results Section */}
            {recipe && (
              <div className="p-6 sm:p-8 bg-gradient-to-b from-gray-50/80 to-white/80 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <ChefHat className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Your AI-Generated Recipe</h3>
                  <Heart className="w-6 h-6 text-rose-400 ml-auto hover:text-rose-500 cursor-pointer transition-colors duration-200" />
                </div>
                
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100/50 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <div className="p-6 sm:p-8">
                    <div className="prose max-w-none">
                      <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-base sm:text-lg">
                        {recipe}
                      </div>
                    </div>
                  </div>
                  
                  {/* Recipe Stats */}
                  <div className="bg-gradient-to-r from-gray-50 to-orange-50/50 px-6 sm:px-8 py-4 border-t border-gray-100/50">
                    <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2 bg-white/60 px-3 py-2 rounded-full">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className="font-medium">Quick & Easy</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/60 px-3 py-2 rounded-full">
                        <Users className="w-4 h-4 text-rose-500" />
                        <span className="font-medium">Perfect for leftovers</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/60 px-3 py-2 rounded-full">
                        <Sparkles className="w-4 h-4 text-pink-500" />
                        <span className="font-medium">AI-Powered</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button
                    onClick={() => setRecipe('')}
                    className="flex-1 bg-gray-100/80 backdrop-blur-sm text-gray-700 font-semibold py-4 px-6 rounded-2xl hover:bg-gray-200/80 transition-all duration-200 border border-gray-200/50 hover:shadow-lg"
                  >
                    Clear Recipe
                  </button>
                  <button
                    onClick={handleGenerate}
                    className="flex-1 bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-2xl hover:from-orange-600 hover:via-rose-600 hover:to-pink-600 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300"
                  >
                    Generate Another
                  </button>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="p-6 sm:p-8 bg-gradient-to-b from-gray-50/80 to-white/80 backdrop-blur-sm border-t border-gray-100/50">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 via-rose-400 to-pink-500 rounded-3xl shadow-2xl mb-6 relative">
                    <div className="animate-spin rounded-full h-10 w-10 border-3 border-white border-t-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-rose-400 to-pink-500 rounded-3xl animate-pulse opacity-50"></div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Cooking up something special...</h3>
                  <p className="text-gray-600 text-base sm:text-lg">Our AI chef is analyzing your ingredients and creating the perfect recipe</p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!recipe && !loading && (
              <div className="p-6 sm:p-8 bg-gradient-to-b from-gray-50/80 to-white/80 backdrop-blur-sm border-t border-gray-100/50">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mb-6 shadow-lg">
                    <Utensils className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Ready to create something delicious?</h3>
                  <p className="text-gray-600 text-base sm:text-lg">Enter your leftover ingredients above and let our AI chef work its magic!</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-8 sm:mt-12">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/50">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <span className="text-gray-700 font-medium">Powered by AI</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-700 font-medium">Transform leftovers into gourmet meals</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecipeGenerator;