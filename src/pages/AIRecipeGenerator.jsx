import React, { useState } from 'react';
import api from '../utils/api';

const AIRecipeGenerator = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await api.post('/recipes/generate', {
        ingredients: ingredients.split(',').map(item => item.trim())
      });
      setRecipe(res.data.recipe);
    } catch (err) {
      alert('Failed to generate recipe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">AI Leftover Recipe Generator</h2>
      <textarea
        className="w-full p-4 border border-gray-300 rounded mb-4"
        rows="4"
        placeholder="Enter leftover ingredients, separated by commas..."
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Recipe'}
      </button>
      {recipe && (
        <div className="mt-6 whitespace-pre-wrap bg-gray-50 p-4 rounded border">
          <h3 className="text-xl font-semibold mb-2">Your AI Recipe</h3>
          <p>{recipe}</p>
        </div>
      )}
    </div>
  );
};

export default AIRecipeGenerator;
