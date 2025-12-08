import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (id) => {
    if (window.location.pathname !== "/home") {
      navigate("/home");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <div className="sticky top-0 bg-black w-full text-white flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 md:px-10 shadow-lg z-50">
      
      {/* Logo */}
      <img
        src="/assets/home.png"
        alt="Logo"
        className="h-14 rounded-full cursor-pointer transition duration-300 hover:scale-110"
        onClick={() => handleNavigation("home")}
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-8 text-lg">

        {/* Service Request Button */}
        <li>
          <NavLink to="/service-request">
            <button className="bg-blue-500 px-4 py-2 rounded-2xl hover:bg-blue-600 transition duration-300">
              Request Service
            </button>
          </NavLink>
        </li>

        <li className="hover:text-gray-400 transition duration-300 hover:scale-110">
          <button onClick={() => handleNavigation("home")}>Home</button>
        </li>

        <li className="hover:text-gray-400 transition duration-300 hover:scale-110">
          <button onClick={() => handleNavigation("about")}>About Us</button>
        </li>

        <li className="hover:text-gray-400 transition duration-300 hover:scale-110">
          <button onClick={() => handleNavigation("services")}>Services</button>
        </li>

        <li className="hover:text-gray-400 transition duration-300 hover:scale-110">
          <button onClick={() => handleNavigation("contact")}>Contact Us</button>
        </li>

        <li className="hover:text-gray-400 transition duration-300 hover:scale-110">
          <button onClick={() => navigate("/profile")}>Profile</button>
        </li>
      </ul>

      {/* Mobile Menu Toggle Button */}
      <button
        className="md:hidden text-white text-3xl focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-black flex flex-col items-center py-4 shadow-lg md:hidden space-y-4">

          {/* Request Service */}
          <NavLink to="/service-request">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 w-52 transition duration-300">
              Request Service
            </button>
          </NavLink>

          {/* Navigation Buttons */}
          <button
            className="text-white py-2 text-lg hover:text-gray-400 w-full text-center"
            onClick={() => handleNavigation("home")}
          >
            Home
          </button>

          <button
            className="text-white py-2 text-lg hover:text-gray-400 w-full text-center"
            onClick={() => handleNavigation("about")}
          >
            About Us
          </button>

          <button
            className="text-white py-2 text-lg hover:text-gray-400 w-full text-center"
            onClick={() => handleNavigation("services")}
          >
            Services
          </button>

          <button
            className="text-white py-2 text-lg hover:text-gray-400 w-full text-center"
            onClick={() => handleNavigation("contact")}
          >
            Contact Us
          </button>

          {/* Profile Button */}
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded-xl hover:bg-gray-600 w-52 transition duration-300"
            onClick={() => {
              navigate("/profile");
              setIsOpen(false);
            }}
          >
            Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
