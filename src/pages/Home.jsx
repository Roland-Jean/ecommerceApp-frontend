// src/pages/Home.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useProducts } from "../hooks/useProducts";
import { setSelectedCategory, clearFilters, setCurrentPage } from '../store/uiSlice';
import { addItem } from '../store/cartSlice';
import HomePlaceHolder from "../assets/placeholders/Homeplaceholder";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // TanStack Query for server state
  const { data: products = [], isLoading, error } = useProducts();
  
  // Redux for client state
  const searchQuery = useSelector(state => state.search.query);
  const selectedCategory = useSelector(state => state.ui.selectedCategory);
  const currentPage = useSelector(state => state.ui.currentPage);
  
  // Local state for filtered products
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const productsPerPage = 9;

  // Extract categories from products
  const extractCategories = (productsArray) => {
    if (!Array.isArray(productsArray)) return [];
    
    const categoryMap = new Map();
    productsArray.forEach(product => {
      if (product.category) {
        const categoryKey = product.category.toLowerCase().trim();
        if (!categoryMap.has(categoryKey)) {
          categoryMap.set(categoryKey, {
            name: product.category.trim(),
            key: categoryKey,
            count: 1,
            icon: '📦', // You can add logic to assign different icons
            color: 'from-blue-500 to-blue-600' // You can add logic for colors
          });
        } else {
          categoryMap.get(categoryKey).count++;
        }
      }
    });
    
    return Array.from(categoryMap.values()).sort((a, b) => b.count - a.count);
  };

  // Update categories when products change
  useEffect(() => {
    if (products.length > 0) {
      const extractedCategories = extractCategories(products);
      setCategories(extractedCategories);
    }
  }, [products]);

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products;

    // Apply search filter first
    if (searchQuery && searchQuery.trim()) {
      const searchTerm = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category?.toLowerCase().includes(searchTerm) ||
        product.badge?.toLowerCase().includes(searchTerm)
      );
    }

    // Then apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.category && product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
    dispatch(setCurrentPage(1)); // Reset to first page when filters change
  }, [products, searchQuery, selectedCategory, dispatch]);

  // Product selection handler
  const selectProduct = (product) => {
    navigate(`/details/${product.id}`);
  };

  // Add to cart handler
  const addToCart = (product) => {
    dispatch(addItem(product));
  };

  // Category selection handler
  const selectCategory = (categoryName) => {
    dispatch(setSelectedCategory(categoryName));
  };

  // Clear filters handler
  const clearAllFilters = () => {
    dispatch(clearFilters());
  };

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Pagination handlers
  const paginate = (pageNumber) => dispatch(setCurrentPage(pageNumber));
  const nextPage = () => dispatch(setCurrentPage(Math.min(currentPage + 1, totalPages)));
  const prevPage = () => dispatch(setCurrentPage(Math.max(currentPage - 1, 1)));

  // Loading and error states
  if (isLoading) return <HomePlaceHolder />;
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <p className="text-red-600 mb-4">{error.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Menu */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* All Products button */}
          <div className="mb-6 text-center">
            <button
              onClick={clearAllFilters}
              className={`px-6 py-2 rounded-lg font-medium transition-colors duration-300 ${
                !selectedCategory && !searchQuery
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All Products ({products.length})
            </button>
          </div>
          
          {/* Categories */}
          {categories.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category) => (
                <button
                  key={category.key}
                  className="group"
                  onClick={() => selectCategory(category.name)}
                >
                  <div
                    className={`bg-gradient-to-br ${category.color} p-6 rounded-xl text-white text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category.name ? 'ring-4 ring-blue-300' : ''
                    }`}
                  >
                    <div className="text-3xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold text-sm">{category.name}</h3>
                    <p className="text-xs opacity-75 mt-1">({category.count})</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Show current filter status */}
          {(selectedCategory || searchQuery) && (
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {searchQuery 
                  ? `Search Results for "${searchQuery}" (${filteredProducts.length} items)`
                  : `${selectedCategory} Products (${filteredProducts.length} items)`
                }
              </h2>
              <button
                onClick={clearAllFilters}
                className="mt-2 text-blue-600 hover:text-blue-800 underline"
              >
                Clear filters
              </button>
            </div>
          )}
          
          {/* Products Grid */}
          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                >
                  <div
                    className="relative cursor-pointer"
                    onClick={() => selectProduct(product)}
                  >
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-6xl">{product.image || '📦'}</span>
                    </div>
                    {product.badge && (
                      <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-400">
                        {"★★★★★".slice(0, Math.floor(product.rating || 0))}
                      </div>
                      <span className="text-gray-600 text-sm ml-2">
                        ({product.rating || 0})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-gray-400 line-through ml-2">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Empty state
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-4">
                {searchQuery 
                  ? `No products match "${searchQuery}"`
                  : selectedCategory 
                    ? `No products in ${selectedCategory} category`
                    : 'No products available'
                }
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                View All Products
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 space-x-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white"
                }`}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                    currentPage === number
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  {number}
                </button>
              ))}

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Your existing Special Offers and Features sections remain the same */}
    </div>
  );
}