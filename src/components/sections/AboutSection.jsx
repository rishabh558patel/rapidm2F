// src/components/sections/AboutSection.jsx
import React from "react";

const AboutSection = () => {
  return (
    <div className="pt-20 roboto" id="about">
      {/* Heading */}
      <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl underline px-4 sm:px-6 md:px-8 xl:px-40 mt-6 sm:mt-8 md:mt-10">
        About Us
      </h1>

      <div className="flex w-full flex-col md:flex-row px-4 sm:px-6 md:px-8">
        {/* Left Section - Image */}
        <div className="left w-full md:w-[30%] p-6 sm:p-8 flex justify-center items-center">
          <img
            src="/assets/about3.png"
            alt="About Us"
            className="max-w-full h-auto sm:max-w-xs md:max-w-sm lg:max-w-md"
          />
        </div>

        {/* Right Section - Text */}
        <div className="right w-full md:w-[70%] text-center">
          {/* Description */}
          <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl px-4 sm:px-6 md:px-8 xl:px-40 mt-4 sm:mt-6 md:mt-10">
            Welcome to
            <a
              href="/home"
              className="hover:underline ml-2 cursor-pointer font-bold text-blue-400 text-xl sm:text-2xl md:text-3xl"
            >
              RapidM
            </a>
            , your reliable online mobile repair service in Rewa! We understand
            how essential your smartphone is in your daily life. That’s why we
            offer quick, affordable, and secure repair services at your
            doorstep. No more waiting in long queues or worrying about data
            security—our expert technicians provide on-the-spot repairs using
            100% original parts for a hassle-free experience.
          </p>

          {/* Why Choose Us */}
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl underline px-4 sm:px-6 md:px-8 xl:px-40 mt-6 sm:mt-8 md:mt-10">
            Why Choose Us?
          </h1>

          <div className="flex flex-col text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-6 sm:mt-8 md:mt-10 gap-3 px-4 sm:px-6 md:px-8 xl:px-40 text-white">
            <span>✅ Doorstep Repair – Get your phone repaired at home.</span>
            <span>✅ Fast & Affordable – Quick service at competitive prices.</span>
            <span>✅ Data Security – Your personal data stays safe.</span>
            <span>✅ 100% Genuine Parts – We use only original components.</span>
            <span>✅ Trust & Reliability – Serving Rewa with top-quality service.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
