import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Products from "../assets/Products.json";

export default function Header({ setSearchItem, addCart }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  // Fonction de recherche
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Vérifier s'il y a des résultats avant de naviguer
      const results = Products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.badge.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (results.length === 0) {
        setSearchItem(Products); // Afficher message "Aucun produit trouvé" et suggérer des alternatives
      } else {
        setSearchItem(results);
      }

      setSearchQuery(""); // Reset search input
      setIsMenuOpen(false); // Fermer le menu mobile
      setShowSuggestions(false); // Cacher les suggestions
    }
  };

  // Gestion de l'input de recherche avec suggestions
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      // Chercher des suggestions
      const suggestions = Products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limiter à 5 suggestions

      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
      setSearchItem(suggestions);
    } else {
      setShowSuggestions(false);
      setSearchSuggestions([]);
      setSearchItem(Products);
    }
  };

  // Gestion de la touche Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  // Sélectionner une suggestion
  function selectSuggestion(suggestion) {
    setSearchQuery(suggestion.name);
    setSearchItem(suggestion); // Wrap in array
    navigate(`/details/${suggestion.id}`); // Navigate to results
    setShowSuggestions(false);
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-300"
            >
              🛍️ E-commerce
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                onFocus={() =>
                  searchQuery.length > 0 && setShowSuggestions(true)
                }
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 pr-12 text-gray-700 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors duration-300">
                  Search
                </div>
              </button>
            </form>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
                {searchSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    onClick={() => {
                      selectSuggestion(suggestion);
                      console.log("Click detected on suggestion");
                    }}
                    className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <span className="text-2xl mr-3">{suggestion.image}</span>
                    <div>
                      <div className="font-medium text-gray-900">
                        {suggestion.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {suggestion.category}
                      </div>
                    </div>
                    <div className="ml-auto text-blue-600 font-semibold">
                      {suggestion.price}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results Suggestion */}
            {showSuggestions &&
              searchQuery.length > 2 &&
              searchSuggestions.length === 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
                  <div className="px-4 py-6 text-center">
                    <div className="text-4xl mb-2">🔍</div>
                    <div className="text-gray-600 mb-2">
                      Aucun produit trouvé pour "{searchQuery}"
                    </div>
                    <div className="text-sm text-gray-500">
                      Essayez: "iPhone", "laptop", "headphones"
                    </div>
                  </div>
                </div>
              )}
          </div>

          {/* Cart and User Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 group"
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <img
                  src="https://img.icons8.com/?size=100&id=9671&format=png&color=000000"
                  alt="Shopping Cart Icon"
                  className="w-6 h-6"
                />
              </div>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                {addCart.length}
              </span>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Shopping Cart
                </div>
              </div>
            </Link>

            {/* Login/Register */}
            <Link
              to="/login"
              className="hidden md:inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 font-medium"
            >
              Login/Register
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 focus:outline-none transition-colors duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search and Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            {/* Mobile Search */}
            <div className="px-4 py-3">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pl-10 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </form>
              <button
                onClick={handleSearch}
                className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
              >
                Search
              </button>

              {/* Mobile No Results */}
              {searchQuery.length > 2 && searchSuggestions.length === 0 && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg text-center">
                  <div className="text-2xl mb-1">🔍</div>
                  <div className="text-sm text-gray-600">
                    Aucun produit trouvé
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Navigation */}
            <div className="px-4 py-3 space-y-2 border-t border-gray-200">
              <Link
                to="/login"
                className="block w-full text-center px-4 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Login/Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
