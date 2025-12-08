// src/components/sections/ContactSection.jsx
import React from "react";

const ContactSection = () => {
  return (
    <div className="pt-25 roboto min-h-[85vh]" id="contact">
      <h1 className="px-6 sm:px-10 md:px-20 lg:px-40 flex items-center text-white text-3xl sm:text-4xl md:text-5xl underline">
        Contact Us
      </h1>

      <div className="flex w-full flex-col md:flex-row px-4 sm:px-6 md:px-8">
        {/* Left Section */}
        <div className="left w-full md:w-[70%] p-4 sm:p-6 md:p-8 text-left rounded-2xl">
          <div className="text-white flex flex-col text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl m-4 sm:m-6 md:m-8 gap-3 sm:gap-4">
            <p>
              <span className="mr-3 sm:mr-5">📞</span> Phone: +91 7566568647
            </p>

            <p>
              <span className="mr-3 sm:mr-5">📍</span> Service Area: Rewa, MP
            </p>

            <p>
              <a
                className="mr-3 sm:mr-5 hover:text-blue-500"
                href="mailto:rapidmofficial@gmail.com"
              >
                <span className="mr-6">📧</span>
                rapidmofficial@gmail.com
              </a>
            </p>

            <p>
              <span className="mr-3 sm:mr-5">🕒</span> Timings: 9 AM – 9 PM
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="right w-full md:w-[30%] text-white prata-regular text-xl rounded-2xl flex justify-center items-center flex-col">
          <img
            src="/assets/contact2.png"
            alt="Contact"
            className="max-w-full h-auto sm:max-w-xs md:max-w-sm lg:max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
