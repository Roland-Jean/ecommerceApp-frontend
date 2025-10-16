// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useProducts } from '../hooks/useProducts';
import { setQuery, clearSearch } from "../store/searchSlice";
import { clearFilters } from '../store/uiSlice';
import { toggleCart } from '../store/cartSlice';
import UserIcon from "./UserIcon";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  // Redux state
  const searchQuery = useSelector(state => state.search.query);
  const cartItems = useSelector(state => state.cart.items);
  const cartItemCount = useSelector(state => state.cart.itemCount);
  
  // TanStack Query for products (for search suggestions)
  const { data: products = [] } = useProducts();
  
  // Local component state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    dispatch(setQuery(query));

    if (query.trim().length > 0) {
      // Generate suggestions
      const searchSuggestions = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);

      setSuggestions(searchSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      setIsMenuOpen(false);
      navigate('/'); // Navigate to home page where results will be shown
    }
  };

  // Handle suggestion selection
  const selectSuggestion = (product) => {
    console.log('Selecting suggestion:', product); // Debug log
    dispatch(setQuery(product.name));
    setShowSuggestions(false);
    setSuggestions([]);
    navigate(`/product/${product.id}`);
  };

  // Handle logo click (clear all filters)
  const handleLogoClick = () => {
    dispatch(clearSearch());
    dispatch(clearFilters());
    navigate('/');
  };

  // Handle cart toggle
  const handleCartToggle = () => {
    dispatch(toggleCart());
    navigate('/cart');
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              onClick={handleLogoClick}
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
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    onClick={() => selectSuggestion(suggestion)}
                    className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    {/* Fix: Use proper image tag instead of text span */}
                    <div className="w-12 h-12 flex-shrink-0 mr-3 bg-gray-100 rounded-lg overflow-hidden">
                      {suggestion.image &&
                      suggestion.image.startsWith("http") ? (
                        <img
                          src={suggestion.image}
                          alt={suggestion.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback if image fails to load
                            e.target.style.display = "none";
                            const fallback =
                              e.target.parentElement.querySelector(
                                ".image-fallback"
                              );
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                      ) : null}
                      {/* Fallback when no image or image fails */}
                      <div
                        className={`w-full h-full flex items-center justify-center text-gray-400 image-fallback ${
                          suggestion.image &&
                          suggestion.image.startsWith("http")
                            ? "hidden"
                            : "flex"
                        }`}
                      >
                        <span className="text-lg">📦</span>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {suggestion.name}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {suggestion.category}
                        {suggestion.brand && ` • ${suggestion.brand}`}
                      </div>
                    </div>
                    <div className="ml-4 text-blue-600 font-semibold whitespace-nowrap">
                      {typeof suggestion.price === "number"
                        ? `$${suggestion.price.toFixed(2)}`
                        : suggestion.price}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results Message */}
            {showSuggestions &&
              searchQuery.length > 2 &&
              suggestions.length === 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
                  <div className="px-4 py-6 text-center">
                    <div className="text-4xl mb-2">🔍</div>
                    <div className="text-gray-600 mb-2">
                      No products found for "{searchQuery}"
                    </div>
                    <div className="text-sm text-gray-500">
                      Try: "iPhone", "laptop", "headphones"
                    </div>
                  </div>
                </div>
              )}
          </div>

          {/* Cart and Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={handleCartToggle}
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 group cursor-pointer"
            >
              <div className="w-8 h-8 flex items-center justify-center">🛒</div>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Login Button */}
            {isLoggedIn ? (
              <UserIcon user={user} />
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 font-medium"
              >
                Login/Register
              </Link>
            )}

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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
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
            </div>

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