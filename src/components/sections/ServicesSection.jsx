// src/components/sections/ServicesSection.jsx
import React from "react";

const ServicesSection = () => {
  return (
    <div className="pt-25 roboto" id="services">
      {/* Section Heading */}
      <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl underline px-4 sm:px-6 md:px-8 xl:px-40 mt-6 sm:mt-8 md:mt-10">
        Services
      </h1>

      <div className="flex flex-col sm:flex-row w-full px-4 sm:px-6 md:px-8 gap-6 md:gap-8 lg:gap-10 xl:gap-12 items-start">
        
        {/* Left Section - Services List & How It Works */}
        <div className="left w-full sm:w-[70%] p-6 md:p-8 text-left">
          
          {/* Services List */}
          <div className="text-white text-base sm:text-lg md:text-xl lg:text-2xl px-2 sm:px-4 md:px-6 mt-6 sm:mt-8 md:mt-10">
            <p className="m-1 sm:m-2">🔹 Screen Replacement</p>
            <p className="m-1 sm:m-2">🔹 Battery Replacement</p>
            <p className="m-1 sm:m-2">🔹 Software & Data Recovery</p>
            <p className="m-1 sm:m-2">🔹 Water Damage Repair</p>
          </div>

          {/* How It Works Heading */}
          <h1 className="px-2 sm:px-4 md:px-6 text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-6 sm:mt-8 md:mt-10 underline">
            How It Works?
          </h1>

          {/* How It Works Steps */}
          <div className="flex flex-col px-2 sm:px-4 md:px-6 text-sm sm:text-base md:text-lg lg:text-xl mt-6 sm:mt-8 md:mt-10 gap-3 sm:gap-4 text-white text-left">
            <span>1️⃣ Call or WhatsApp us to book a service.</span>
            <span>2️⃣ Describe your issue and schedule an appointment.</span>
            <span>3️⃣ Our expert technician visits your location for repair.</span>
            <span>4️⃣ Get your mobile fixed quickly and securely in front of you.</span>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="right w-full sm:w-[30%] flex justify-center items-center">
          <img
            src="/assets/service_final2.png"
            alt="Service"
            className="w-auto h-auto sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%]"
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
