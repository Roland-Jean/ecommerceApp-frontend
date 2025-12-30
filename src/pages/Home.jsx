// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useProducts } from "../hooks/useProducts";
import {
  setSelectedCategory,
  clearFilters,
  setCurrentPage,
} from "../store/uiSlice";
import { addItem } from "../store/cartSlice";
import HomePlaceHolder from "../assets/placeholders/Homeplaceholder";
import toast from "react-hot-toast";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // TanStack Query for server state
  const { data: products = [], isLoading, error } = useProducts();

  // Redux for client state
  const searchQuery = useSelector((state) => state.search.query);
  const selectedCategory = useSelector((state) => state.ui.selectedCategory);
  const currentPage = useSelector((state) => state.ui.currentPage);

  // Local state for filtered products
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const productsPerPage = 9;

  // Extract categories from products
  const extractCategories = (productsArray) => {
    if (!Array.isArray(productsArray)) return [];

    const categoryMap = new Map();
    productsArray.forEach((product) => {
      if (product.category) {
        const categoryKey = product.category.toLowerCase().trim();
        if (!categoryMap.has(categoryKey)) {
          categoryMap.set(categoryKey, {
            name: product.category.trim(),
            key: categoryKey,
            count: 1,
            icon: "📦",
            color: "from-blue-500 to-blue-600",
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
      console.log("First product:", products[0]);
      console.log("Image URL:", products[0]?.image);
    }
  }, [products]);

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products;

    // Apply search filter first
    if (searchQuery && searchQuery.trim()) {
      const searchTerm = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.category?.toLowerCase().includes(searchTerm) ||
          product.badge?.toLowerCase().includes(searchTerm) ||
          product.brand?.toLowerCase().includes(searchTerm)
      );
    }

    // Then apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
    dispatch(setCurrentPage(1)); // Reset to first page when filters change
  }, [products, searchQuery, selectedCategory, dispatch]);

  // Product selection handler
  const selectProduct = (product) => {
    navigate(`/product/${product.id}`);
  };

  // Add to cart handler
  const addToCart = (product) => {
    dispatch(addItem(product));
    toast.success(`${product.name} added to cart!`);
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
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Pagination handlers
  const paginate = (pageNumber) => dispatch(setCurrentPage(pageNumber));
  const nextPage = () =>
    dispatch(setCurrentPage(Math.min(currentPage + 1, totalPages)));
  const prevPage = () => dispatch(setCurrentPage(Math.max(currentPage - 1, 1)));

  // Format price with currency
  const formatPrice = (price) => {
    if (typeof price === "number") {
      return `${price.toLocaleString("fr-FR")} FCFA`;
    }
    return price || "0 FCFA";
  };

  // Main content
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loading State */}
      {isLoading && <HomePlaceHolder />}

      {/* Error State */}
      {error && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
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
      )}

      {/* Main Content - Only show when not loading and no error */}
      {!isLoading && !error && (
        <>
          {/* Category Menu - Ultra Compact */}
          <section className="py-6 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Categories
                </h2>
                <button
                  onClick={clearAllFilters}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    !selectedCategory && !searchQuery
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  All ({products.length})
                </button>
              </div>

              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {categories.map((category) => (
                    <button
                      key={category.key}
                      onClick={() => selectCategory(category.name)}
                      className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category.name
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                      <span
                        className={`text-xs ${
                          selectedCategory === category.name
                            ? "text-blue-200"
                            : "text-gray-500"
                        }`}
                      >
                        ({category.count})
                      </span>
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
                      : `${selectedCategory} Products (${filteredProducts.length} items)`}
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
                        className="relative cursor-pointer group"
                        onClick={() => selectProduct(product)}
                      >
                        {/* Product Image */}
                        <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                // Fallback if image fails to load
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                          ) : null}
                          {/* Fallback when no image or image fails */}
                          <div
                            className={`w-full h-full flex items-center justify-center ${
                              product.image && product.image.startsWith("http")
                                ? "hidden"
                                : "flex"
                            }`}
                          >
                            <span className="text-4xl">📦</span>
                          </div>
                        </div>

                        {/* Product Badge */}
                        {product.badge && (
                          <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {product.badge}
                          </span>
                        )}

                        {/* Rating Badge */}
                        {product.rating && (
                          <span className="absolute top-4 right-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                            ⭐ {product.rating}
                          </span>
                        )}
                      </div>

                      <div className="p-6">
                        {/* Brand */}
                        {product.brand && (
                          <p className="text-sm text-gray-500 mb-1">
                            {product.brand}
                          </p>
                        )}

                        {/* Product Name */}
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                          {product.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center mb-3">
                          <div className="flex text-yellow-400">
                            {"★".repeat(Math.floor(product.rating || 0))}
                            {"☆".repeat(5 - Math.floor(product.rating || 0))}
                          </div>
                          <span className="text-gray-600 text-sm ml-2">
                            ({product.rating || 0})
                          </span>
                          {product.reviews && (
                            <span className="text-gray-500 text-sm ml-2">
                              • {product.reviews} reviews
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        {product.description && (
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {product.description}
                          </p>
                        )}

                        {/* Price and Add to Cart */}
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-bold text-blue-600">
                              {formatPrice(product.price)}
                            </span>
                            {product.originalPrice &&
                              product.originalPrice > product.price && (
                                <span className="text-gray-400 line-through ml-2 text-sm">
                                  {formatPrice(product.originalPrice)}
                                </span>
                              )}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium cursor-pointer flex items-center space-x-2"
                          >
                            <span>Add to Cart</span>
                            <span>🛒</span>
                          </button>
                        </div>

                        {/* Stock Status */}
                        {product.stock !== undefined && (
                          <div className="mt-3">
                            <div className="text-xs text-gray-500 mb-1">
                              {product.stock > 10
                                ? "In Stock"
                                : product.stock > 0
                                ? `Only ${product.stock} left`
                                : "Out of Stock"}
                            </div>
                            {product.stock > 0 && product.stock <= 20 && (
                              <div className="w-full bg-gray-200 rounded-full h-1">
                                <div
                                  className="bg-green-600 h-1 rounded-full"
                                  style={{
                                    width: `${(product.stock / 20) * 100}%`,
                                  }}
                                ></div>
                              </div>
                            )}
                          </div>
                        )}
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
                      : "No products available"}
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

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
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
                    )
                  )}

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
        </>
      )}
    </div>
  );
}
