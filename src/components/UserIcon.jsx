import { useState, useRef, useEffect } from "react";
import {
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaUser,
  FaChevronDown,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authentificationSlice";
import { logoutService } from "../services/authentificationService";

export default function UserIcon({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials =
    user?.firstName?.[0]?.toUpperCase() + user?.lastName?.[0]?.toUpperCase();
  const userName = user?.firstName
    ? `${user.firstName} ${user.lastName}`
    : user?.email;

  const handleLogout = async () => {
    try {
      await logoutService();
      dispatch(logout());
      navigate("/login");
      setIsOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group"
      >
        {user?.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt="avatar"
            className="w-8 h-8 rounded-full border-2 border-white"
          />
        ) : (
          <div className="w-8 h-8 bg-white text-blue-600 font-bold rounded-full flex items-center justify-center border-2 border-white shadow-inner">
            {initials || <FaUserCircle size={16} />}
          </div>
        )}
        <span className="hidden md:block text-sm font-medium max-w-24 truncate">
          
        </span>
        <FaChevronDown
          className={`hidden md:block transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={12}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden animate-fade-in">
          {/* User Info Header */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="avatar"
                  className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full flex items-center justify-center border-2 border-white shadow-md">
                  {initials || <FaUserCircle size={20} />}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {userName || "Welcome!"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "User Account"}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <Link
              to="/profile"
              className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <FaUser className="text-blue-600" size={14} />
              </div>
              <div>
                <p className="text-sm font-medium">My Profile</p>
                <p className="text-xs text-gray-500">View your profile</p>
              </div>
            </Link>

            <Link
              to="/settings"
              className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <FaCog className="text-green-600" size={14} />
              </div>
              <div>
                <p className="text-sm font-medium">Settings</p>
                <p className="text-xs text-gray-500">Manage preferences</p>
              </div>
            </Link>

            {/* Divider */}
            <div className="border-t border-gray-100 my-2"></div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group w-full text-left"
            >
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                <FaSignOutAlt className="text-red-600" size={14} />
              </div>
              <div>
                <p className="text-sm font-medium">Sign Out</p>
                <p className="text-xs text-red-500">Log out of your account</p>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-2 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Secure • Encrypted
            </p>
          </div>
        </div>
      )}

      {/* Add this to your global CSS for the fade-in animation */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
