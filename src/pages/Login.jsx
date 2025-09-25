import {  useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const {
    register,
    handleSubmit,
    formState: { errors,isValid },
  } = useForm({mode:"onTouched"});

  const onSubmit = (data) => console.log(data);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        {/* Toggle Buttons */}
        <div className="flex mb-6 space-x-2">
          <Link
            to="/login"
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2 rounded-lg font-semibold text-center transition ${
              activeTab === "login"
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Login
          </Link>
          <Link
            to="/register"
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-2 rounded-lg font-semibold text-center transition ${
              activeTab === "register"
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Register
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              autoFocus
              {...register("email", {  required: "Email is required" , pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },minLength:4})}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password", { required: "Password is required",minLength:7 })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isValid}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
