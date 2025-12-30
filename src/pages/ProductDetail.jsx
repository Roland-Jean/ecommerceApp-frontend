// src/pages/ProductDetail.jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useProducts } from "../hooks/useProducts";
import { addItem } from "../store/cartSlice";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Use TanStack Query instead of local state
  const { data: products = [], isLoading, error } = useProducts();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Find current product and related products from cached data
  const product = products.find((p) => p.id === parseInt(id));
  const relatedProducts = product
    ? products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl animate-bounce mb-4">⏳</div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <p className="text-red-600 mb-4">Error loading product</p>
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

  // Product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h2>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Calculate discount safely
  const getDiscountPercentage = () => {
    if (!product.originalPrice || product.originalPrice === product.price) {
      return 0;
    }
    try {
      const original =
        parseFloat(product.originalPrice.replace("FCFA", "")) || 0;
      const current = parseFloat(product.price.replace("FCFA", "")) || 0;
      return original > current
        ? Math.round(((original - current) / original) * 100)
        : 0;
    } catch {
      return 0;
    }
  };

  const discountPercentage = getDiscountPercentage();

  // Add to cart using Redux
  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      quantity: quantity,
    };
    dispatch(addItem(cartItem));

    // Show success message or notification
    toast.success(`${product.name} added to cart!`);

    // Optionally redirect to cart
    // navigate('/cart');
  };

  const handleBuyNow = () => {
    // Add to cart first
    handleAddToCart();
    // Then go to checkout
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              to={`/category/${product.category}`}
              className="hover:text-blue-600 transition-colors capitalize"
            >
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                <span className="text-8xl">{product.imageUrl || "📦"}</span>
                {product.badge && (
                  <span className="absolute top-6 left-6 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {product.badge}
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="absolute top-6 right-6 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{discountPercentage}%
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    selectedImage === index
                      ? "border-blue-600 shadow-lg"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-md flex items-center justify-center">
                    <span className="text-2xl">{product.imageUrl || "📦"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <div className="flex text-yellow-400 text-lg">
                    {"★★★★★".slice(0, Math.floor(product.rating || 4))}
                  </div>
                  <span className="text-gray-600 ml-2">
                    ({product.rating || 4.0})
                  </span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600 text-sm">127 reviews</span>
                <span className="text-gray-400">|</span>
                <span className="text-green-600 text-sm font-medium">
                  In Stock
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-3xl font-bold text-blue-600">
                  {product.price}
                </span>
                {product.originalPrice &&
                  product.originalPrice !== product.price && (
                    <>
                      <span className="text-xl text-gray-400 line-through">
                        {product.originalPrice}
                      </span>
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                        Save {discountPercentage}%
                      </span>
                    </>
                  )}
              </div>
              <p className="text-gray-600 text-sm">
                Tax included • Free shipping
              </p>
            </div>

            {/* Rest of your existing JSX for features, quantity, etc. */}
            {/* ... (keep all the existing JSX but update the buttons) */}

            {/* Quantity and Add to Cart */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center space-x-4 mb-6">
                <label className="text-gray-700 font-medium">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 min-w-[60px] text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  🛒 Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  ⚡ Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Related Products
              </h2>
              <Link
                to={`/category/${product.category}`}
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
              >
                <span>View All</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`} // Updated route
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                >
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-4xl">
                        {relatedProduct.imageUrl || "📦"}
                      </span>
                    </div>
                    {relatedProduct.badge && (
                      <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {relatedProduct.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400 text-sm">
                        {"★★★★★".slice(
                          0,
                          Math.floor(relatedProduct.rating || 4)
                        )}
                      </div>
                      <span className="text-gray-600 text-sm ml-1">
                        ({relatedProduct.rating || 4.0})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-blue-600">
                          {relatedProduct.price}
                        </span>
                        {relatedProduct.originalPrice &&
                          relatedProduct.originalPrice !==
                            relatedProduct.price && (
                            <span className="text-sm text-gray-400 line-through ml-2">
                              {relatedProduct.originalPrice}
                            </span>
                          )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
