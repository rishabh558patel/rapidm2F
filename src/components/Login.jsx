import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://rapidm2b.onrender.com/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        toast.success("Login successful!", {
          autoClose: 2000,
        });
        navigate("/home");
      } else {
        toast.error(data.message || "Invalid credentials, please try again.", {
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

      {/* Login Card */}
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
        <h1 className="text-gray-900 font-bold text-2xl mt-4">Welcome Back</h1>

        <div className="h-0.5 w-4/5 bg-gray-300 my-4 mx-auto"></div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="text-left space-y-4">
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

          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-white font-semibold rounded-lg shadow-md transition duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? "Logging In..." : "Log In"}
            </button>
          </div>
        </form>

        {/* Redirect */}
        <p className="mt-4 text-gray-700 text-sm">
          Don’t have an account?{" "}
          <NavLink to="/signup" className="text-blue-600 font-semibold">
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
