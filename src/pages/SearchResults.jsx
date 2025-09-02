import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SearchResults({ searchItem }) {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (searchItem && searchItem.length > 0) {
      setResults(searchItem);
    }
    setIsLoading(false);
  }, [searchItem]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Search Results
              </h1>
              <p className="text-gray-600 mt-2">
                {results.length} product{results.length !== 1 ? "s" : ""} found
              </p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-6xl">{product.image}</span>
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
                  <p className="text-gray-600 text-sm mb-3">
                    {product.category}
                  </p>
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                      {"★★★★★".slice(0, Math.floor(product.rating || 0))}
                    </div>
                    {product.rating && (
                      <span className="text-gray-600 text-sm ml-2">
                        ({product.rating})
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through ml-2">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🔍</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              No products found
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              We couldn't find any products matching your search. Try different
              keywords or browse our categories.
            </p>
            <div className="space-x-4">
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Continue Shopping
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Try Another Search
              </button>
            </div>
          </div>
        )}

        {/* Browse Categories Suggestion */}
        {results.length > 0 && (
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Browse Categories
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { name: "Phones", icon: "📱", path: "/category/phones" },
                { name: "Laptops", icon: "💻", path: "/category/laptops" },
                { name: "Audio", icon: "🎧", path: "/category/audio" },
                { name: "Watches", icon: "⌚", path: "/category/watches" },
              ].map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <div className="text-sm font-medium text-gray-900">
                    {category.name}
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
