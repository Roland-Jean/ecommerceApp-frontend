import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));
  const [activeTab, setActiveTab] = useState("register");

  const steps = [
    <div key="name" className="space-y-4">
      <h2 className="text-lg font-semibold">Name</h2>
      <input
        placeholder="First name..."
        className="w-full border px-3 py-2 rounded"
      />
      <input
        placeholder="Last name..."
        className="w-full border px-3 py-2 rounded"
      />
    </div>,

    <div key="contact" className="space-y-4">
      <h2 className="text-lg font-semibold">Contact Info</h2>
      <input
        placeholder="E-mail..."
        className="w-full border px-3 py-2 rounded"
      />
      <input
        placeholder="Phone..."
        className="w-full border px-3 py-2 rounded"
      />
    </div>,

    <div key="birthday" className="space-y-4">
      <h2 className="text-lg font-semibold">Birthday</h2>
      <input type="date" className="w-full border px-3 py-2 rounded" />
    </div>,

    <div key="login" className="space-y-4">
      <h2 className="text-lg font-semibold">Login Info</h2>
      <input
        placeholder="Username..."
        className="w-full border px-3 py-2 rounded"
      />
      <input
        placeholder="Password..."
        className="w-full border px-3 py-2 rounded"
      />
      <input
        placeholder="Repeat Password..."
        className="w-full border px-3 py-2 rounded"
      />
    </div>,
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6">
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

        {steps[step]}

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 0}
            className={`px-4 py-2 rounded ${
              step === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>

          <button
            type="button"
            onClick={nextStep}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {step === steps.length - 1 ? "Submit" : "Next"}
          </button>
        </div>

        <div className="flex justify-center space-x-2 mt-4">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-3 w-3 rounded-full ${
                i === step ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      </form>
    </div>
  );
}
