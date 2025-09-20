import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [step, setStep] = useState(0);
  const [activeTab, setActiveTab] = useState("register");

  // Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthday: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Errors state
  const [errors, setErrors] = useState({});

  // Touched state
  const [touched, setTouched] = useState({});

  // Validation functions
  const validateName = (name, fieldName) => {
    if (!name.trim()) return `${fieldName} is required`;
    if (name.trim().length < 2)
      return `${fieldName} must be at least 2 characters`;
    if (!/^[a-zA-Z\s]+$/.test(name))
      return `${fieldName} can only contain letters`;
    return null;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid email address";
    return null;
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    if (!phone) return "Phone number is required";
    if (!phoneRegex.test(phone.replace(/[\s\-()]/g, "")))
      return "Invalid phone number";
    return null;
  };

  const validateBirthday = (birthday) => {
    if (!birthday) return "Birthday is required";
    const today = new Date();
    const birthDate = new Date(birthday);
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 13) return "You must be at least 13 years old";
    if (age > 120) return "Invalid birth date";
    return null;
  };

  const validateUsername = (username) => {
    if (!username) return "Username is required";
    if (username.length < 3) return "Username must be at least 3 characters";
    if (!/^[a-zA-Z0-9_]+$/.test(username))
      return "Username can only contain letters, numbers, and underscores";
    return null;
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/(?=.*[a-z])/.test(password))
      return "Password must contain at least one lowercase letter";
    if (!/(?=.*[A-Z])/.test(password))
      return "Password must contain at least one uppercase letter";
    if (!/(?=.*\d)/.test(password))
      return "Password must contain at least one number";
    return null;
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return "Please confirm your password";
    if (confirmPassword !== password) return "Passwords do not match";
    return null;
  };

  // Handle input change with validation
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Validate immediately
    let error = null;
    switch (field) {
      case "firstName":
        error = validateName(value, "First name");
        break;
      case "lastName":
        error = validateName(value, "Last name");
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "birthday":
        error = validateBirthday(value);
        break;
      case "username":
        error = validateUsername(value);
        break;
      case "password":
        error = validatePassword(value);
        // Also revalidate confirm password if it exists
        if (formData.confirmPassword && touched.confirmPassword) {
          const confirmError = validateConfirmPassword(
            formData.confirmPassword,
            value
          );
          setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
        }
        break;
      case "confirmPassword":
        error = validateConfirmPassword(value, formData.password);
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    handleInputChange(field, formData[field]);
  };

  // Check if current step is valid
  const isStepValid = (stepIndex) => {
    switch (stepIndex) {
      case 0: // Name step
        return (
          !validateName(formData.firstName, "First name") &&
          !validateName(formData.lastName, "Last name") &&
          formData.firstName &&
          formData.lastName
        );
      case 1: // Contact step
        return (
          !validateEmail(formData.email) &&
          !validatePhone(formData.phone) &&
          formData.email &&
          formData.phone
        );
      case 2: // Birthday step
        return !validateBirthday(formData.birthday) && formData.birthday;
      case 3: // Login step
        return (
          !validateUsername(formData.username) &&
          !validatePassword(formData.password) &&
          !validateConfirmPassword(
            formData.confirmPassword,
            formData.password
          ) &&
          formData.username &&
          formData.password &&
          formData.confirmPassword
        );
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (isStepValid(step)) {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = () => {
    // Mark all fields as touched
    const allFields = Object.keys(formData);
    const touchedState = {};
    allFields.forEach((field) => (touchedState[field] = true));
    setTouched(touchedState);

    // Validate all fields
    const allErrors = {};
    allFields.forEach((field) => {
      let error = null;
      switch (field) {
        case "firstName":
          error = validateName(formData[field], "First name");
          break;
        case "lastName":
          error = validateName(formData[field], "Last name");
          break;
        case "email":
          error = validateEmail(formData[field]);
          break;
        case "phone":
          error = validatePhone(formData[field]);
          break;
        case "birthday":
          error = validateBirthday(formData[field]);
          break;
        case "username":
          error = validateUsername(formData[field]);
          break;
        case "password":
          error = validatePassword(formData[field]);
          break;
        case "confirmPassword":
          error = validateConfirmPassword(formData[field], formData.password);
          break;
      }
      if (error) allErrors[field] = error;
    });

    setErrors(allErrors);

    if (Object.keys(allErrors).length === 0) {
      console.log("Registration successful!", formData);
      alert("Registration successful! Check console for form data.");
    }
  };

  // Input component with validation
  const ValidatedInput = ({ field, type = "text", placeholder, label }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={formData[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        onBlur={() => handleBlur(field)}
        className={`w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors ${
          touched[field] && errors[field]
            ? "border-red-500 focus:ring-red-500"
            : touched[field] && !errors[field] && formData[field]
            ? "border-green-500 focus:ring-green-500"
            : "border-gray-300 focus:ring-blue-500"
        }`}
      />
      {touched[field] && errors[field] && (
        <p className="mt-1 text-sm text-red-600">{errors[field]}</p>
      )}
      {touched[field] && !errors[field] && formData[field] && (
        <p className="mt-1 text-sm text-green-600">
          ✓ Valid {label.toLowerCase()}
        </p>
      )}
    </div>
  );

  const steps = [
    <div key="name" className="space-y-4">
      <h2 className="text-lg font-semibold text-center">
        Personal Information
      </h2>
      <ValidatedInput
        field="firstName"
        placeholder="First name..."
        label="First Name"
      />
      <ValidatedInput
        field="lastName"
        placeholder="Last name..."
        label="Last Name"
      />
    </div>,

    <div key="contact" className="space-y-4">
      <h2 className="text-lg font-semibold text-center">Contact Information</h2>
      <ValidatedInput
        field="email"
        type="email"
        placeholder="example@gmail.com"
        label="Email"
      />
      <ValidatedInput
        field="phone"
        type="tel"
        placeholder="+1234567890"
        label="Phone Number"
      />
    </div>,

    <div key="birthday" className="space-y-4">
      <h2 className="text-lg font-semibold text-center">Date of Birth</h2>
      <ValidatedInput field="birthday" type="date" label="Birthday" />
    </div>,

    <div key="login" className="space-y-4">
      <h2 className="text-lg font-semibold text-center">Account Details</h2>
      <ValidatedInput
        field="username"
        placeholder="Choose a username..."
        label="Username"
      />
      <ValidatedInput
        field="password"
        type="password"
        placeholder="Create a secure password..."
        label="Password"
      />
      <ValidatedInput
        field="confirmPassword"
        type="password"
        placeholder="Confirm your password..."
        label="Confirm Password"
      />
    </div>,
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
        {/* Tab Navigation */}
        <div className="flex mb-6 space-x-2">
          <Link
          to="/login"
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

        {/* Progress indicators */}
        <div className="flex justify-center space-x-2 mb-6">
          {steps.map((_, i) => (
            <div key={i} className="flex items-center">
              <span
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  i < step
                    ? "bg-green-500 text-white"
                    : i === step
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </span>
              {i < steps.length - 1 && (
                <div
                  className={`w-8 h-1 mx-1 ${
                    i < step ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Current step */}
        {steps[step]}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 0}
            className={`px-6 py-2 rounded-md font-semibold transition ${
              step === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
          >
            Previous
          </button>

          <button
            type="button"
            onClick={step === steps.length - 1 ? handleSubmit : nextStep}
            disabled={!isStepValid(step)}
            className={`px-6 py-2 rounded-md font-semibold transition ${
              isStepValid(step)
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {step === steps.length - 1 ? "Register" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
