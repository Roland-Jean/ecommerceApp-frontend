import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [step, setStep] = useState(0);
  const name = watch("firstName");

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 2));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
        {/* Tabs */}
        <div className="flex mb-6 space-x-2">
          <Link
            to="/login"
            className="flex-1 py-2 rounded-md font-semibold text-center bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="flex-1 py-2 rounded-md font-semibold text-center bg-blue-600 text-white"
          >
            Register
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {step === 0 && (
            <>
              <h2 className="text-lg font-semibold">Step 1: Personal Info</h2>
              <input
                {...register("firstName", { required: "First name is required" })}
                placeholder="First Name"
                className="w-full px-4 py-2 border rounded"
              />
              {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}

              <input
                {...register("lastName", { required: "Last name is required" })}
                placeholder="Last Name"
                className="w-full px-4 py-2 border rounded"
              />
              {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}

              <input
                type="date"
                {...register("dateOfBirth", { required: "Date of birth is required" })}
                className="w-full px-4 py-2 border rounded"
              />
              {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth.message}</p>}
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="text-lg font-semibold">Step 2: Contact Info</h2>
              <h3 className="text-sm text-gray-600 mb-2">Hi {name}, welcome!</h3>

              <input
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}

              <input
                {...register("phoneNumber", { required: "Phone number is required" })}
                placeholder="Phone Number"
                className="w-full px-4 py-2 border rounded"
              />
              {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}

              <input
                {...register("address", { required: "Address is required" })}
                placeholder="Address"
                className="w-full px-4 py-2 border rounded"
              />
              {errors.address && <p className="text-red-500">{errors.address.message}</p>}
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-lg font-semibold">Step 3: Security</h2>

              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}

              <input
                type="password"
                {...register("confirmedPassword", { required: "Confirm your password" })}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded"
              />
              {errors.confirmedPassword && (
                <p className="text-red-500">{errors.confirmedPassword.message}</p>
              )}
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-4">
            {step > 0 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Previous
              </button>
            )}
            {step < 2 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
