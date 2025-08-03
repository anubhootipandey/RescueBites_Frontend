import React, { useState, useEffect } from "react";
import {
  ChefHat,
  Sparkles,
  Clock,
  Users,
  Utensils,
  ArrowRight,
  Heart,
  Zap,
  Award,
  AlertCircle,
  BookOpen,
  Trash2,
  Search,
  Calendar,
  X,
  Save,
  RefreshCw,
  FileText,
  Printer,
} from "lucide-react";

const AIRecipeGenerator = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [showSavedRecipes, setShowSavedRecipes] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [customPrompt, setCustomPrompt] = useState(
    "Generate a simple recipe using only"
  );
  const [notification, setNotification] = useState("");

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const GEMINI_API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
  const STORAGE_KEY = "aiRecipesData";

  // Enhanced localStorage functions
  const loadRecipesFromStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate the data structure
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (recipe) =>
              recipe &&
              typeof recipe === "object" &&
              recipe.id &&
              recipe.recipe &&
              recipe.ingredients
          );
        }
      }
      return [];
    } catch (error) {
      console.error("Error loading recipes from localStorage:", error);
      // Clear corrupted data
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
  };

  const saveRecipesToStorage = (recipes) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
      return true;
    } catch (error) {
      console.error("Error saving recipes to localStorage:", error);
      setError("Failed to save recipe. Your browser storage might be full.");
      return false;
    }
  };

  // Load saved recipes from localStorage on component mount
  useEffect(() => {
    const loadedRecipes = loadRecipesFromStorage();
    setSavedRecipes(loadedRecipes);
    console.log("Loaded recipes from storage:", loadedRecipes.length);
  }, []);

  // Save recipes to localStorage whenever savedRecipes changes
  useEffect(() => {
    if (savedRecipes.length > 0) {
      const success = saveRecipesToStorage(savedRecipes);
      if (success) {
        console.log("Saved recipes to storage:", savedRecipes.length);
      }
    }
  }, [savedRecipes]);

  // Enhanced notification system
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(""), 3000);
  };

  const saveRecipe = (recipeText, ingredientsList, usedPrompt = "") => {
    const newRecipe = {
      id: Date.now().toString() + "_" + Math.random().toString(36).substr(2, 9),
      recipe: recipeText,
      ingredients: Array.isArray(ingredientsList) ? ingredientsList : [],
      prompt: usedPrompt,
      createdAt: new Date().toISOString(),
      isFavorite: false,
    };

    setSavedRecipes((prev) => {
      const updated = [newRecipe, ...prev];
      console.log("Adding new recipe, total:", updated.length);
      return updated;
    });

    showNotification("Recipe saved successfully! ✨", "success");
  };

  const deleteRecipe = (id) => {
    setSavedRecipes((prev) => {
      const updated = prev.filter((recipe) => recipe.id !== id);
      console.log("Deleted recipe, remaining:", updated.length);
      return updated;
    });
    showNotification("Recipe deleted", "info");
  };

  const toggleFavorite = (id) => {
    setSavedRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === id
          ? { ...recipe, isFavorite: !recipe.isFavorite }
          : recipe
      )
    );
  };

  const clearAllRecipes = () => {
    if (
      window.confirm(
        "Are you sure you want to delete all saved recipes? This action cannot be undone."
      )
    ) {
      setSavedRecipes([]);
      localStorage.removeItem(STORAGE_KEY);
      showNotification("All recipes cleared", "info");
    }
  };

  const exportRecipes = () => {
    try {
      const dataStr = JSON.stringify(savedRecipes, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ai-recipes-${
        new Date().toISOString().split("T")[0]
      }.json`;
      link.click();
      URL.revokeObjectURL(url);
      showNotification("Recipes exported successfully!", "success");
    } catch (error) {
      setError("Failed to export recipes");
    }
  };

  const exportSingleRecipeAsText = (recipe) => {
    try {
      // Extract recipe title from the recipe text
      const lines = recipe.recipe.split("\n");
      let recipeTitle = "Delicious Recipe";

      // Try to find a title in the recipe text
      for (const line of lines) {
        if (
          line.match(/^(Recipe Name:|Title:|.*Recipe$)/i) ||
          (line.trim() &&
            !line.match(/^\d+\./) &&
            !line.match(/^(Ingredients|Instructions|Cooking Time|Servings):/i))
        ) {
          recipeTitle = line.replace(/^(Recipe Name:|Title:)/i, "").trim();
          if (recipeTitle && recipeTitle.length > 3) break;
        }
      }

      // Create a comprehensive text format
      const textContent = `
═══════════════════════════════════════════════════════════════
                           ${recipeTitle.toUpperCase()}
═══════════════════════════════════════════════════════════════

📅 Created: ${formatDate(recipe.createdAt)}
🥘 Ingredients Used: ${recipe.ingredients.join(", ")}
${recipe.isFavorite ? "⭐ Marked as Favorite" : ""}

───────────────────────────────────────────────────────────────
                              RECIPE
───────────────────────────────────────────────────────────────

${recipe.recipe}

───────────────────────────────────────────────────────────────
                         RECIPE DETAILS
───────────────────────────────────────────────────────────────

🎯 Recipe Style: ${recipe.prompt || "Simple recipe with limited ingredients"}
📝 Generated: Using AI with minimal ingredients approach
💾 Recipe ID: ${recipe.id}

═══════════════════════════════════════════════════════════════
           Generated by AI Recipe Generator
           Exported on: ${new Date().toLocaleString()}
═══════════════════════════════════════════════════════════════
      `.trim();

      const dataBlob = new Blob([textContent], { type: "text/plain" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;

      // Create filename from recipe title or ingredients
      let filename = recipeTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 30);

      if (!filename || filename === "delicious-recipe") {
        filename =
          recipe.ingredients.length > 0
            ? recipe.ingredients
                .slice(0, 2)
                .join("-")
                .toLowerCase()
                .replace(/[^a-z0-9-]/g, "")
            : "recipe";
      }

      filename = `${filename}-${
        new Date(recipe.createdAt).toISOString().split("T")[0]
      }.txt`;

      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
      showNotification("Recipe exported as text file!", "success");
    } catch (error) {
      showNotification("Failed to export recipe as text", "error");
    }
  };

  const exportSingleRecipeAsPDF = (recipe) => {
    try {
      // Extract recipe title
      const lines = recipe.recipe.split("\n");
      let recipeTitle = "Delicious Recipe";

      for (const line of lines) {
        if (
          line.match(/^(Recipe Name:|Title:|.*Recipe$)/i) ||
          (line.trim() &&
            !line.match(/^\d+\./) &&
            !line.match(/^(Ingredients|Instructions|Cooking Time|Servings):/i))
        ) {
          recipeTitle = line.replace(/^(Recipe Name:|Title:)/i, "").trim();
          if (recipeTitle && recipeTitle.length > 3) break;
        }
      }

      // Create a new window with the recipe content formatted for PDF
      const printWindow = window.open("", "_blank");
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${recipeTitle}</title>
          <style>
            body {
              font-family: 'Georgia', serif;
              line-height: 1.6;
              max-width: 800px;
              margin: 0 auto;
              padding: 40px 20px;
              color: #333;
              background: white;
            }
            .header {
              text-align: center;
              border-bottom: 3px solid #e67e22;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .title {
              font-size: 28px;
              font-weight: bold;
              color: #e67e22;
              margin-bottom: 10px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .subtitle {
              font-size: 14px;
              color: #666;
              font-style: italic;
            }
            .meta-info {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 30px;
              border-left: 4px solid #e67e22;
            }
            .meta-row {
              margin-bottom: 8px;
              font-size: 14px;
            }
            .meta-label {
              font-weight: bold;
              color: #e67e22;
            }
            .ingredients-section {
              background: #fff5f5;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 25px;
              border: 1px solid #fed7d7;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              color: #c53030;
              margin-bottom: 15px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .ingredients-list {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
            }
            .ingredient-tag {
              background: #e67e22;
              color: white;
              padding: 6px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 500;
            }
            .recipe-content {
              background: white;
              padding: 25px;
              border-radius: 8px;
              border: 1px solid #e2e8f0;
              line-height: 1.8;
            }
            .recipe-text {
              font-size: 15px;
              white-space: pre-line;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 2px solid #e2e8f0;
              text-align: center;
              font-size: 12px;
              color: #666;
            }
            .favorite-badge {
              display: inline-block;
              background: #ffd700;
              color: #b7791f;
              padding: 4px 12px;
              border-radius: 15px;
              font-size: 12px;
              font-weight: bold;
              margin-left: 10px;
            }
            @media print {
              body { margin: 0; padding: 20px; }
              .header { page-break-after: avoid; }
              .meta-info { page-break-inside: avoid; }
              .ingredients-section { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">${recipeTitle}</div>
            <div class="subtitle">AI-Generated Recipe with Limited Ingredients</div>
            ${
              recipe.isFavorite
                ? '<span class="favorite-badge">⭐ FAVORITE</span>'
                : ""
            }
          </div>
          
          <div class="meta-info">
            <div class="meta-row">
              <span class="meta-label">📅 Created:</span> ${formatDate(
                recipe.createdAt
              )}
            </div>
            <div class="meta-row">
              <span class="meta-label">🎯 Recipe Style:</span> ${
                recipe.prompt || "Simple recipe with limited ingredients"
              }
            </div>
            <div class="meta-row">
              <span class="meta-label">📝 Generated:</span> Using AI with minimal ingredients approach
            </div>
          </div>
          
          <div class="ingredients-section">
            <div class="section-title">🥘 Main Ingredients Used</div>
            <div class="ingredients-list">
              ${recipe.ingredients
                .map(
                  (ingredient) =>
                    `<span class="ingredient-tag">${ingredient}</span>`
                )
                .join("")}
            </div>
          </div>
          
          <div class="recipe-content">
            <div class="recipe-text">${recipe.recipe}</div>
          </div>
          
          <div class="footer">
            <p><strong>Generated by AI Recipe Generator</strong></p>
            <p>Exported on: ${new Date().toLocaleString()}</p>
            <p>Recipe ID: ${recipe.id}</p>
          </div>
        </body>
        </html>
      `;

      printWindow.document.write(htmlContent);
      printWindow.document.close();

      // Wait for content to load then trigger print
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 250);
      };

      showNotification("Opening PDF export dialog...", "success");
    } catch (error) {
      showNotification("Failed to export recipe as PDF", "error");
    }
  };

  const filteredRecipes = savedRecipes.filter(
    (recipe) =>
      recipe.recipe.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      (recipe.prompt &&
        recipe.prompt.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleGenerate = async () => {
    if (!ingredients.trim()) {
      setError("Please enter some ingredients first!");
      return;
    }

    if (!GEMINI_API_KEY) {
      setError(
        "Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const ingredientList = ingredients
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      // Create prompt for limited ingredient recipe
      const finalPrompt = `${customPrompt} ${ingredientList.join(
        ", "
      )} and minimal common pantry items.

Requirements:
- Use ONLY the provided ingredients plus basic pantry staples (salt, pepper, oil, water)
- Keep the recipe simple and short
- Maximum 6-8 steps
- Focus on the main ingredients provided
- Provide a clear recipe name
- List exact ingredients needed
- Give concise step-by-step instructions
- Mention cooking time and servings

Format the response clearly and keep it concise. If the ingredients don't work well together, suggest the closest possible recipe or modifications.`;

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: finalPrompt,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Details:", errorData);
        throw new Error(
          `API Error: ${
            errorData.error?.message ||
            errorData.error?.status ||
            "Failed to generate recipe"
          }`
        );
      }

      const data = await response.json();
      console.log("API Response:", data);
      const generatedRecipe = data.candidates[0].content.parts[0].text;

      if (!generatedRecipe || generatedRecipe.trim().length === 0) {
        throw new Error("Empty response from Gemini API");
      }

      const finalRecipe = generatedRecipe.trim();
      setRecipe(finalRecipe);

      // Auto-save the generated recipe
      saveRecipe(finalRecipe, ingredientList, customPrompt);
    } catch (err) {
      console.error("Recipe generation error:", err);
      let errorMessage = "Failed to generate recipe. Please try again.";

      if (err.message.includes("API key")) {
        errorMessage =
          "Invalid API key. Please check your Gemini API configuration.";
      } else if (err.message.includes("quota")) {
        errorMessage = "API quota exceeded. Please try again later.";
      } else if (
        err.message.includes("network") ||
        err.message.includes("fetch")
      ) {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (err.message.includes("Invalid recipe input")) {
        errorMessage =
          "The AI had trouble with those ingredients. Try different combinations or check your spelling.";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleGenerate();
    }
  };

  const popularIngredients = [
    { name: "Rice", color: "bg-orange-100 text-orange-700 border-orange-200" },
    {
      name: "Vegetables",
      color: "bg-green-100 text-green-700 border-green-200",
    },
    { name: "Pasta", color: "bg-blue-100 text-blue-700 border-blue-200" },
    { name: "Dal", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
    {
      name: "Cheese",
      color: "bg-purple-100 text-purple-700 border-purple-200",
    },
  ];

  const features = [
    { icon: Zap, title: "Instant Results", desc: "Get recipes in seconds" },
    { icon: Award, title: "Simple Recipes", desc: "Limited ingredients only" },
    { icon: Save, title: "Auto Save", desc: "Recipes saved automatically" },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatRecipeText = (text) => {
    // Split by common recipe sections and format
    const sections = text.split(
      /(?=\d+\.|Ingredients:|Instructions:|Cooking Time:|Servings:|Tips:|Recipe Name:|Title:)/i
    );

    return sections
      .map((section, index) => {
        const trimmedSection = section.trim();
        if (!trimmedSection) return null;

        // Check if it's a heading
        if (
          trimmedSection.match(
            /^(Recipe Name:|Title:|Ingredients:|Instructions:|Cooking Time:|Servings:|Tips:)/i
          )
        ) {
          return (
            <div key={index} className="mb-2">
              <h4 className="font-bold text-gray-800 text-sm mb-1 border-b border-gray-200 pb-1">
                {trimmedSection}
              </h4>
            </div>
          );
        }

        // Check if it's a numbered step
        if (trimmedSection.match(/^\d+\./)) {
          return (
            <div key={index} className="mb-1 pl-3">
              <p className="text-gray-700 text-xs leading-relaxed">
                {trimmedSection}
              </p>
            </div>
          );
        }

        // Regular paragraph
        return (
          <div key={index} className="mb-2">
            <p className="text-gray-700 text-xs leading-relaxed">
              {trimmedSection}
            </p>
          </div>
        );
      })
      .filter(Boolean);
  };

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

      {/* Enhanced Notification System */}
      {notification && (
        <div
          className={`fixed top-4 right-4 px-6 py-4 rounded-2xl shadow-2xl z-50 border backdrop-blur-sm animate-in slide-in-from-right-5 duration-300 ${
            notification.type === "success"
              ? "bg-green-500/90 text-white border-green-400"
              : notification.type === "error"
              ? "bg-red-500/90 text-white border-red-400"
              : "bg-blue-500/90 text-white border-blue-400"
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === "success" && <Save className="w-5 h-5" />}
            {notification.type === "error" && (
              <AlertCircle className="w-5 h-5" />
            )}
            {notification.type === "info" && <RefreshCw className="w-5 h-5" />}
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}

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
              <span className="text-orange-700 font-semibold text-sm">
                AI-Powered Recipe Generator
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight">
              Simple Recipes with
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl">
                Limited Ingredients
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-6">
              Create{" "}
              <span className="font-bold text-orange-600">simple recipes</span>{" "}
              using only the ingredients you specify. Perfect for minimal
              cooking with maximum flavor!
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300"
                >
                  <feature.icon className="w-4 h-4 text-orange-500" />
                  <span className="text-gray-700 font-medium text-sm">
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Enhanced Saved Recipes Button */}
            {savedRecipes.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setShowSavedRecipes(!showSavedRecipes)}
                  className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold py-3 px-6 rounded-2xl hover:bg-white transition-all duration-200 shadow-lg border border-gray-200/50 hover:shadow-xl"
                >
                  <BookOpen className="w-5 h-5 text-orange-500" />
                  <span>
                    {showSavedRecipes ? "Hide" : "View"} Saved Recipes (
                    {savedRecipes.length})
                  </span>
                </button>

                <button
                  onClick={clearAllRecipes}
                  className="inline-flex items-center gap-2 bg-red-100/80 backdrop-blur-sm text-red-700 font-semibold py-3 px-4 rounded-2xl hover:bg-red-200/80 transition-all duration-200 shadow-lg border border-red-200/50"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Clear All</span>
                </button>
              </div>
            )}
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3 shadow-lg">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
              <button
                onClick={() => setError("")}
                className="ml-auto text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Enhanced Saved Recipes Section */}
          {showSavedRecipes && savedRecipes.length > 0 && (
            <div className="mb-8 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-400 to-purple-400">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-white" />
                    <h2 className="text-2xl font-bold text-white">
                      Saved Recipes ({savedRecipes.length})
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowSavedRecipes(false)}
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-200"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Search Bar */}
                <div className="mt-4 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70" />
                  <input
                    type="text"
                    placeholder="Search saved recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-2 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>

                {/* Storage Status */}
                <div className="mt-4 flex items-center gap-2 text-white/90 text-sm">
                  <Save className="w-4 h-4" />
                  <span>Recipes saved to browser storage</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                    {Math.round(JSON.stringify(savedRecipes).length / 1024)} KB
                    used
                  </span>
                </div>
              </div>

              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredRecipes.map((savedRecipe) => (
                    <div
                      key={savedRecipe.id}
                      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {formatDate(savedRecipe.createdAt)}
                              </span>
                              <div className="flex items-center gap-1 ml-auto">
                                <Save className="w-3 h-3 text-green-500" />
                                <span className="text-xs text-green-600 font-medium">
                                  Saved
                                </span>
                              </div>
                            </div>

                            {savedRecipe.prompt && (
                              <div className="mb-2 p-2 bg-blue-50 rounded-lg border border-blue-100">
                                <p className="text-xs text-blue-700 font-medium">
                                  {savedRecipe.prompt}
                                </p>
                              </div>
                            )}

                            <div className="flex flex-wrap gap-1 mb-2">
                              {savedRecipe.ingredients
                                .slice(0, 2)
                                .map((ingredient, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full border border-orange-200"
                                  >
                                    {ingredient}
                                  </span>
                                ))}
                              {savedRecipe.ingredients.length > 2 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                  +{savedRecipe.ingredients.length - 2}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => toggleFavorite(savedRecipe.id)}
                              className={`p-1 rounded-full transition-all duration-200 ${
                                savedRecipe.isFavorite
                                  ? "bg-red-100 text-red-500 hover:bg-red-200"
                                  : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                              }`}
                            >
                              <Heart
                                className={`w-3 h-3 ${
                                  savedRecipe.isFavorite ? "fill-current" : ""
                                }`}
                              />
                            </button>
                            <button
                              onClick={() =>
                                exportSingleRecipeAsText(savedRecipe)
                              }
                              className="p-1 bg-gray-100 text-gray-400 rounded-full hover:bg-green-100 hover:text-green-500 transition-all duration-200"
                              title="Export as Text"
                            >
                              <FileText className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() =>
                                exportSingleRecipeAsPDF(savedRecipe)
                              }
                              className="p-1 bg-gray-100 text-gray-400 rounded-full hover:bg-blue-100 hover:text-blue-500 transition-all duration-200"
                              title="Export as PDF"
                            >
                              <Printer className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => deleteRecipe(savedRecipe.id)}
                              className="p-1 bg-gray-100 text-gray-400 rounded-full hover:bg-red-100 hover:text-red-500 transition-all duration-200"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <div className="prose max-w-none">
                          <div className="text-gray-700 text-xs leading-relaxed max-h-24 overflow-hidden">
                            {savedRecipe.recipe.length > 150
                              ? savedRecipe.recipe.substring(0, 150) + "..."
                              : savedRecipe.recipe}
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-orange-50/80 to-red-50/80 px-4 py-3 border-t border-gray-100/50">
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              setRecipe(savedRecipe.recipe);
                              setIngredients(
                                savedRecipe.ingredients.join(", ")
                              );
                              if (savedRecipe.prompt) {
                                setCustomPrompt(savedRecipe.prompt);
                              }
                              setShowSavedRecipes(false);
                              showNotification("Recipe loaded!", "info");
                            }}
                            className="flex-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-semibold py-2 px-2 rounded-lg hover:from-orange-600 hover:via-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 text-xs"
                          >
                            View Full Recipe
                          </button>
                          <button
                            onClick={() =>
                              exportSingleRecipeAsText(savedRecipe)
                            }
                            className="bg-green-500 text-white font-semibold py-2 px-2 rounded-lg hover:bg-green-600 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 text-xs flex items-center gap-1"
                            title="Export as Text"
                          >
                            <FileText className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => exportSingleRecipeAsPDF(savedRecipe)}
                            className="bg-blue-500 text-white font-semibold py-2 px-2 rounded-lg hover:bg-blue-600 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 text-xs flex items-center gap-1"
                            title="Export as PDF"
                          >
                            <Printer className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredRecipes.length === 0 && searchTerm && (
                  <div className="text-center py-8">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">
                      No recipes match your search "{searchTerm}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

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
                  <div className="flex-1">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      Custom Recipe Prompt
                    </h2>
                    <p className="text-white/80 text-sm">
                      Customize how you want your recipe generated
                    </p>
                  </div>
                  {savedRecipes.length > 0 && (
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
                      <Save className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-medium">
                        {savedRecipes.length}
                      </span>
                    </div>
                  )}
                </div>

                {/* Custom Prompt Input */}
                <div className="mb-6">
                  <label className="text-white/90 text-sm font-medium mb-2 block">
                    Recipe Style:
                  </label>
                  <input
                    type="text"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                    placeholder="Generate a simple recipe using only"
                  />
                  <p className="text-white/70 text-xs mt-1">
                    Example: "Generate a simple recipe using only" or "Create a
                    quick meal with just"
                  </p>
                </div>

                {/* Popular Ingredients */}
                <div className="mb-6">
                  <p className="text-white/90 text-sm font-medium mb-3">
                    Popular ingredients:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {popularIngredients.map((ingredient, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const current = ingredients ? ingredients + ", " : "";
                          setIngredients(
                            current + ingredient.name.toLowerCase()
                          );
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
                    placeholder="Eg. rice, garlic (will generate: Generate a simple recipe using only rice, garlic and minimal pantry items)"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <div className="absolute bottom-4 right-4 text-xs text-gray-400 bg-white/90 px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                    <kbd className="font-mono bg-gray-100 px-1 rounded">
                      Ctrl
                    </kbd>{" "}
                    +{" "}
                    <kbd className="font-mono bg-gray-100 px-1 rounded">
                      Enter
                    </kbd>{" "}
                    to generate
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={loading || !ingredients.trim() || !GEMINI_API_KEY}
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
                      <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent font-bold">
                        Generate Recipe
                      </span>
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
                    <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      Your AI-Generated Recipe
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Simple recipe with limited ingredients • Auto-saved
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full">
                      <Save className="w-3 h-3 text-green-600" />
                      <span className="text-green-700 text-xs font-medium">
                        Saved
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100/50 overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="p-6 sm:p-8">
                    <div className="prose max-w-none">
                      <div className="text-gray-700 leading-relaxed text-sm">
                        {formatRecipeText(recipe)}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Recipe Stats */}
                  <div className="bg-gradient-to-r from-orange-50/80 to-red-50/80 px-6 sm:px-8 py-5 border-t border-gray-100/50">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-orange-100">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className="font-semibold text-gray-700 text-sm">
                          Quick & Simple
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-red-100">
                        <Users className="w-4 h-4 text-red-500" />
                        <span className="font-semibold text-gray-700 text-sm">
                          Limited Ingredients
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-green-100">
                        <Save className="w-4 h-4 text-green-500" />
                        <span className="font-semibold text-gray-700 text-sm">
                          Auto-Saved
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button
                    onClick={() => setRecipe("")}
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
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    Creating your simple recipe...
                  </h3>
                  <p className="text-gray-600 text-base sm:text-lg mb-4">
                    Using only your specified ingredients with minimal additions
                  </p>
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
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    Ready to create a simple recipe?
                  </h3>
                  <p className="text-gray-600 text-base sm:text-lg mb-6">
                    Enter your ingredients and customize your prompt to generate
                    recipes with limited ingredients!
                  </p>

                  {/* Quick Start Tips */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-orange-600 font-bold text-sm">
                          1
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm font-medium">
                        Customize your prompt
                      </p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-red-600 font-bold text-sm">
                          2
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm font-medium">
                        List your ingredients
                      </p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-pink-600 font-bold text-sm">
                          3
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm font-medium">
                        Auto-saved recipes!
                      </p>
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
              <span className="text-gray-700 font-semibold">
                Custom Prompts
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-700 font-semibold">
                Limited Ingredients
              </span>
              <span className="text-gray-400">•</span>
              <Save className="w-4 h-4 text-green-500" />
              <span className="text-gray-700 font-semibold">
                Persistent Storage
              </span>
            </div>

            <p className="text-gray-600 text-sm mt-4 max-w-md mx-auto">
              Create simple recipes using only the ingredients you specify with
              custom prompts.
              <br />
              <span className="text-green-600 font-medium">
                Recipes automatically saved and persist across sessions!
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecipeGenerator;
