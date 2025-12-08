import React from "react";
import { useState } from "react"
import { NavLink } from "react-router-dom";

const Language = () => {
  // State to track selected language
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  
  // Function to update selected language
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-5 py-10 relative ">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-black  via-gray-500 to-gray-300"></div>

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
          Welcome to our Online Technical Services
        </h1>

        {/* Divider */}
        <div className="h-0.5 w-4/5 bg-gray-300 my-4 mx-auto"></div>

        {/* Language Selection Heading */}
        <h2 className="text-xl font-semibold text-gray-700 mt-4">
          Choose Language
        </h2>

        {/* Language Selection Options */}
        <div className="flex flex-col items-center mt-4 font-bold space-y-3">
          <label className="flex items-center text-lg text-gray-800">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-500 accent-blue-600 mr-3"
              checked={selectedLanguage === "English"}
              onChange={() => handleLanguageChange("English")}
            />
            English
          </label>

          {/* Additional language option (currently commented out) */}
          {/* <label className="flex items-center text-lg font-bold text-gray-800">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-500 accent-blue-600 mr-3"
              checked={selectedLanguage === "Hindi"}
              onChange={() => handleLanguageChange("Hindi")}
            />
            हिंदी
          </label> */}
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <NavLink to="/login">
            <button className="hover:cursor-pointer  w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
              Submit
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Language;
