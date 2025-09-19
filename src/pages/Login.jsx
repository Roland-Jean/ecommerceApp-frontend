import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Toggle Buttons */}
        <div className="flex mb-6 space-x-2">
          <Link
          to="/login"
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2 rounded-md font-semibold text-white transition ${
              activeTab === "login"
                ? "bg-blue-600"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
          >
            Login
          </Link>
          <Link
          to="/register"
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-2 rounded-md font-semibold text-white transition ${
              activeTab === "register"
                ? "bg-blue-600"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
          >
            Register
          </Link>
        </div>

        {/* Form */}
        <form className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="text"
                placeholder="example@google.com"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
