import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!email) return "Email is required";
    if (email.length < 5) return "Email must be at least 5 characters long";
    if (!emailRegex.test(email)) return "Invalid email address";
    return null;
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6)
      return "Password must be at least 6 characters long";
    return null;
  };

const handleInputChange = (field, value) => {
  setFormData((prev) => ({ ...prev, [field]: value }));

  // Validate immediately
  let error = null;
  if (field === "email") error = validateEmail(value);
  if (field === "password") error = validatePassword(value);

  setErrors((prev) => ({ ...prev, [field]: error }));
};

  const hasErrors =
    validateEmail(formData.email) !== null ||
    validatePassword(formData.password) !== null;


  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted successfully!", formData);
      // Add your login logic here
      alert("Login successful! Check console for form data.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Toggle Buttons */}
        <div className="flex mb-6 space-x-2">
          <Link
          to="login"
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2 rounded-md font-semibold transition text-center ${
              activeTab === "login"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Login
          </Link>
          <Link
          to="/register"
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-2 rounded-md font-semibold transition text-center ${
              activeTab === "register"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Register
          </Link>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                name="email"
                id="email"
                type="email"
                autoFocus
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`mt-1 block w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                name="password"
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={`mt-1 block w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
          disabled={hasErrors}
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
