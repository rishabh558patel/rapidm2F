import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const Navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simple validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-center" });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:1001/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Signup successful! Redirecting to login...", {
          autoClose: 2000,
        });

        // Redirect after short delay
        Navigate("/login");
      } else {
        toast.error(data.message || "Signup failed. Please try again.", {
          position: "top-center",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again later.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-5 py-10 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-black via-gray-500 to-gray-300"></div>

      {/* Signup Card */}
      <div className="bg-white max-w-lg w-full p-8 rounded-3xl shadow-lg text-center">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/assets/home2.png"
            alt="Logo"
            className="rounded-full h-20 w-20"
          />
        </div>

        {/* Heading */}
        <h1 className="text-gray-900 font-bold text-2xl mt-4">
          Create Your Account
        </h1>

        {/* Divider */}
        <div className="h-0.5 w-4/5 bg-gray-300 my-4 mx-auto"></div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="text-left space-y-4">
          <div>
            <label className="text-gray-700 font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-gray-700 font-semibold">Contact</label>
            <input
              type="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </button>
            <div className="flex flex-col gap-3 mt-6">
              {/* Google Button */}
              <button
                type="button"
                onClick={() =>
                  (window.location.href = "http://localhost:1001/auth/google")
                }
                className="w-full flex items-center justify-center gap-3 py-2.5 
               bg-white border border-gray-300 text-gray-700 font-semibold 
               rounded-lg shadow-sm hover:bg-gray-50 transition duration-200"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-5 w-5"
                />
                Signup with Google
              </button>

              {/* GitHub Button */}
              <button
                type="button"
                onClick={() =>
                  (window.location.href = "http://localhost:1001/auth/github")
                }
                className="w-full flex items-center justify-center gap-3 py-2.5 
               bg-gray-900 text-white font-semibold rounded-lg shadow-sm 
               hover:bg-gray-800 transition duration-200"
              >
                <img
                  src="https://www.svgrepo.com/show/512317/github-142.svg"
                  alt="GitHub"
                  className="h-5 w-5 invert"
                />
                Signup with GitHub
              </button>
            </div>
          </div>
        </form>

        {/* Redirect */}
        <p className="mt-4 text-gray-700 text-sm">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-600 font-semibold">
            Log In
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
