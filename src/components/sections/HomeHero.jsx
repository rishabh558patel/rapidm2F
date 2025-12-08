// src/components/sections/HomeHero.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import StarRating from "../StarRating"; // adjust path if needed

const HomeHero = ({ customerText = "(100+)" }) => {
  return (
    <div id="home" className="pt-20 roboto">
      {/* Background Gradient (kept here so hero looks identical) */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-gradient-to-b from-black via-gray-700 to-gray-500"></div>

      <div className="flex w-full flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-8 gap-6">
        {/* Left Side */}
        <div className="left w-full md:w-1/2 p-8 text-white prata-regular text-xl rounded-2xl flex justify-center items-center flex-col">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white"
          >
            RAPiDM
          </motion.h1>

          <p className="text-xs sm:text-xl md:text-2xl lg:text-3xl mt-5">
            Free and Fast Home Mobile Repairing.
          </p>

          <p className="mt-5 text-xs sm:text-xl md:text-2xl lg:text-3xl text-green-500">
            Location: <span className="text-green-500">Rewa, MP, India</span>
          </p>

          <p className="mt-5 text-xs sm:text-xl md:text-2xl lg:text-3xl text-blue-500">
            {customerText} <span className="text-blue-500">Happy Customers</span>
          </p>

          <div className="flex justify-center mt-5">
            <StarRating />
          </div>

          <NavLink to="/service-request">
            <button className="mt-10 md:hidden flex items-center justify-center bg-blue-500 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 roboto">
              Request Service
            </button>
          </NavLink>
        </div>

        {/* Right Side with Image */}
        <div className="right p-10 sm:w-full md:w-1/2 rounded-2xl overflow-hidden">
          <img src="/assets/home6.png" alt="" className="w-full max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
