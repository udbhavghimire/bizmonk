"use client";

import React, { useState } from "react";

const BookingDate = ({ image }) => {
  const [imgError, setImgError] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact info submitted:", contactInfo);
  };

  return (
    <div
      className="relative z-0 w-full rounded-xl bg-very-light-gray flex items-center mt-8 sm:mt-16 hidden md:block overflow-hidden shadow-lg"
      id="bookdate"
    >
      <div className="flex sm:flex-row flex-col w-full">
        {/* Image Section */}
        <div className="w-full sm:w-1/2 relative h-[400px]">
          {image && !imgError ? (
            <div className="relative w-full h-full">
              <img
                src={image}
                alt="Schedule viewing"
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center bg-gray-50">
              <img
                src="/icons/no-photo.png"
                className="w-8 h-8"
                alt="No photo"
              />
              <p className="text-gray-500 mt-1 text-sm">No Image Available</p>
            </div>
          )}
        </div>

        {/* Contact Form */}
        <div className="w-full sm:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
            <h1 className="font-bold text-2xl mb-6 text-center text-gray-800">
              Contact Us
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactInfo.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Phone and Email */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={contactInfo.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Phone number"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactInfo.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Email address"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDate;
