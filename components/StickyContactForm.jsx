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
    <div className="hidden lg:block sticky top-24">
      <div className="bg-white p-6 rounded-3xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-[60px] h-[60px] overflow-hidden relative rounded-[60px]">
              <Image
                src="/ravi-godara.png"
                alt="Agent"
                fill
                className="object-cover object-top"
              />
            </div>
           
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-1">Book a Showing</h2>
            <p className="text-sm text-gray-600">Check Out this business!</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-3 px-6 rounded-xl hover:opacity-90 transition duration-200 text-base font-medium"
          >
            Contact now
          </button>
          <p className="text-xs text-gray-500 text-center mt-4">
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
