import React from "react";
import { NavLink } from "react-router-dom";

const RequestSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-5 py-10 relative ">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-black via-gray-500 to-gray-300"></div>

      {/* Content Container */}
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
          Repair Request Submitted!
        </h1>

        {/* Divider */}
        <div className="h-0.5 w-4/5 bg-gray-300 my-4 mx-auto"></div>

        {/* Message */}
        <p className="text-lg text-gray-700 mt-2">
          Thank you! Your request has been successfully submitted.
        </p>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <NavLink to="/service-request">
            <button className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
              Submit Another Request
            </button>
          </NavLink>

          <NavLink to="/home">
            <button className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition duration-300">
              Go to Home
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default RequestSuccess;
