"use client";
import Image from "next/image";
import { useState } from "react";

const StickyContactForm = ({ listingData }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: `Please send me additional information about ${listingData?.StreetNumber} ${listingData?.StreetName} ${listingData?.Municipality || ""}, ${listingData?.Province || "Ontario"}. Thank you`
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add your form submission logic here
      console.log("Form submitted:", formData);
      // Reset form after successful submission
      setFormData(prev => ({
        ...prev,
        name: "",
        phone: "",
        email: "",
      }));
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="hidden lg:block sticky top-24 mt-10">
      <div className="bg-gradient-to-br from-white via-white to-gray-50 p-8 rounded-3xl shadow-xl border border-gray-100">
        <div className="flex items-center gap-5 mb-8">
          <div className="relative">
            <div className="w-[70px] h-[70px] overflow-hidden relative rounded-2xl shadow-md">
              <Image
                src="/ravi-godara.png"
                alt="Agent"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Book a Showing</h2>
            <p className="text-sm text-gray-600">Check Out this business!</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full px-5 py-3.5 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 placeholder-gray-400 transition-all duration-200 shadow-sm"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full px-5 py-3.5 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 placeholder-gray-400 transition-all duration-200 shadow-sm"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              className="w-full px-5 py-3.5 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 placeholder-gray-400 transition-all duration-200 shadow-sm"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              className="w-full px-5 py-3.5 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 placeholder-gray-400 transition-all duration-200 shadow-sm resize-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white py-4 px-6 rounded-2xl hover:opacity-90 transition-all duration-200 text-base font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Contact now
          </button>
          <p className="text-xs text-gray-500 text-center mt-6 leading-relaxed">
            I agree to receive marketing and customer service calls and text
            messages from Bizmonk. Consent is not a condition of purchase.
            Msg/data rates may apply. Msg frequency varies. Reply STOP to
            unsubscribe.
          </p>
        </form>
      </div>
    </div>
  );
};

export default StickyContactForm;
