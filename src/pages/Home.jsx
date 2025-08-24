import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Products from "../assets/Products.json";
import Categories from "../assets/Category.json";

export default function Home() {
  // Erweiterte Produktliste mit type-Eigenschaft für Sortierung
  const allProducts = Products;

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // Änderung auf 9 Produkte pro Seite

  // Reset pagination when component mounts (when returning to home)
  useEffect(() => {
    setCurrentPage(1);
  }, []);

  // Berechne Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(allProducts.length / productsPerPage);

  // Pagination Funktionen
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Menu */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {Categories.map((category, index) => (
              <Link
                key={index}
                to={`/category/${category.name.toLowerCase()}`}
                className="group"
              >
                <div
                  className={`bg-gradient-to-br ${category.color} p-6 rounded-xl text-white text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                >
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-sm">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-6xl">{product.image}</span>
                  </div>
                  <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.badge}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                      {"★★★★★".slice(0, Math.floor(product.rating))}
                    </div>
                    <span className="text-gray-600 text-sm ml-2">
                      ({product.rating})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">
                        {product.price}
                      </span>
                      <span className="text-gray-400 line-through ml-2">
                        {product.originalPrice}
                      </span>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 space-x-2">
              {/* Previous Button */}
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

              {/* Page Numbers */}
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

              {/* Next Button */}
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

      {/* Special Offers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Special Offer! 🎁
                </h2>
                <p className="text-xl mb-6 text-purple-100">
                  Get 25% off on all electronics. Limited time offer - don't
                  miss out!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/promotion"
                    className="bg-yellow-400 text-purple-700 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors duration-300 text-center"
                  >
                    Shop Deals
                  </Link>
                  <span className="text-purple-100 font-medium py-3 text-center">
                    Ends in: 3 days, 12 hours
                  </span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-8xl mb-4">💫</div>
                <div className="text-6xl font-bold">25% OFF</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚚",
                title: "Free Shipping",
                description: "Free shipping on orders over $50",
              },
              {
                icon: "🔒",
                title: "Secure Payment",
                description: "100% secure payment processing",
              },
              {
                icon: "↩️",
                title: "Easy Returns",
                description: "30-day hassle-free return policy",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-sm"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
