// src/pages/Pagnie.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateQuantity,
  removeItem,
  deleteItem,
  clearCart,
} from "../store/cartSlice";

// Helper function to extract price safely
const getPrice = (price) => {
  if (typeof price === "number") {
    return price;
  }
  if (typeof price === "string") {
    // Remove currency symbols and convert to number
    return parseFloat(price.replace(/[^0-9.-]+/g, "")) || 0;
  }
  return 0;
};

export default function Pagnie() {
  const dispatch = useDispatch();

  // Get cart data from Redux
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = useSelector((state) => state.cart.total);
  const cartItemCount = useSelector((state) => state.cart.itemCount);

  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  // Calculate totals safely
  const subtotal = cartItems.reduce((total, item) => {
    const price = getPrice(item.price);
    return total + price * (item.quantity || 1);
  }, 0);

  const shipping = subtotal > 0 ? 5000 : 0; // 5000 FCFA shipping
  const discount = isPromoApplied ? subtotal * 0.1 : 0; // 10% discount
  const total = subtotal + shipping - discount;

  // Update quantity using Redux
  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      dispatch(deleteItem(id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  // Remove item using Redux
  const handleRemoveItem = (id) => {
    dispatch(deleteItem(id));
  };

  // Clear entire cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setIsPromoApplied(true);
      alert("🎉 Promo code applied! 10% discount added.");
    } else {
      alert("Invalid promo code. Try 'SAVE10' for 10% off!");
    }
  };

  // Format price for display in FCFA
  const formatPrice = (price) => {
    const numericPrice = getPrice(price);
    return `${numericPrice.toLocaleString("fr-FR")} FCFA`;
  };

  // Empty cart state
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center bg-white rounded-2xl shadow-xl p-12 transform hover:scale-105 transition-transform duration-300">
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your Shopping Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Continue Shopping
              <svg
                className="w-6 h-6 ml-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Shopping Cart
          </h1>
          <p className="text-gray-600 text-lg">
            Review your selected products before proceeding to checkout.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Cart Items ({cartItemCount})
                </h2>
                <div className="flex gap-4">
                  <Link
                    to="/"
                    className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
                  >
                    Continue Shopping
                    <svg
                      className="w-5 h-5"
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
                  <button
                    onClick={handleClearCart}
                    className="text-red-600 hover:text-red-700 font-medium cursor-pointer"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {cartItems.map((item) => {
                  const itemPrice = getPrice(item.price);
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-6 p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300"
                    >
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center overflow-hidden relative">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-xl"
                            onError={(e) => {
                              e.target.style.display = "none";
                              const fallback =
                                e.target.parentElement.querySelector(
                                  ".fallback-icon"
                                );
                              if (fallback) fallback.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <div
                          className="fallback-icon absolute inset-0 flex items-center justify-center"
                          style={{ display: item.imageUrl ? "none" : "flex" }}
                        >
                          <span className="text-3xl">📦</span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-lg mb-2">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {item.category || "General"}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex text-yellow-400 text-sm">
                            {"★".repeat(Math.floor(item.rating || 4))}
                          </div>
                          <span className="text-gray-500 text-xs">
                            ({item.rating || 4.0})
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-blue-600 text-xl">
                          {formatPrice(item.price)}
                        </p>
                        {item.originalPrice && (
                          <p className="text-gray-400 line-through text-sm">
                            {formatPrice(item.originalPrice)}
                          </p>
                        )}
                        <p className="text-sm text-gray-600 mt-1">
                          {item.quantity} × {formatPrice(item.price)}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors text-xl"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-medium text-lg">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors text-xl"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-3 text-gray-400 hover:text-red-500 transition-colors rounded-xl hover:bg-red-50"
                        title="Remove item"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Promo Code Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-semibold text-gray-900 text-xl mb-4">
                💫 Promo Code
              </h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code (try SAVE10)"
                  className="flex-1 px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                <button
                  onClick={applyPromoCode}
                  disabled={isPromoApplied}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-lg ${
                    isPromoApplied
                      ? "bg-green-500 text-white cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {isPromoApplied ? "Applied! 🎉" : "Apply"}
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    {subtotal.toLocaleString("fr-FR")} FCFA
                  </span>
                </div>

                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping.toLocaleString("fr-FR")} FCFA
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-lg text-green-600">
                    <span>Discount (10%)</span>
                    <span className="font-semibold">
                      -{discount.toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">
                      {total.toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 mb-6 text-lg shadow-lg">
                🛍️ Proceed to Checkout
              </button>

              <div className="text-center">
                <p className="text-gray-500 text-sm mb-3">or</p>
                <Link
                  to="/"
                  className="inline-block text-blue-600 hover:text-blue-700 font-medium text-lg"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Security & Trust Badges */}
              <div className="mt-8 p-5 bg-gray-50 rounded-xl">
                <div className="text-center mb-3">
                  <div className="flex justify-center gap-2 text-2xl">
                    <span>🔒</span>
                    <span>🛡️</span>
                    <span>✅</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Secure checkout • 30-day money-back guarantee • Free returns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
