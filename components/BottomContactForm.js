"use client";

import { useState } from "react";
import { sendEmail } from "@/api/resend";
import { usePathname } from "next/navigation";
import swal from "sweetalert";

const BottomContactForm = ({ proj_name, city }) => {
  const pathname = usePathname();
  const pageUrl = `https://bizmonk.ca${pathname}`;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message:
      "I would like to learn more about your services. Please contact me.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Determine if this is from contact page
      const isContactPage = pathname === "/contact";

      const emailContent = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        "inquiry from": pageUrl,
      };

      const emailTitle = isContactPage
        ? "Bizmonk Inquiry from Contact Page"
        : `Bizmonk Inquiry from ${pathname}`;

      const response = await sendEmail({
        content: emailContent,
        title: emailTitle,
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        message:
          "I would like to learn more about your services. Please contact me.",
      });

      // Show success message
      swal(
        `Thank You, ${formData.name}!`,
        "Your message has been sent successfully. We will get back to you soon.",
        "success"
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      swal(
        "Error",
        "There was a problem sending your message. Please try again.",
        "error"
      );
    }
  };

  return (
    <div className="w-full">
      <div className="bg-gradient-to-br from-white via-white to-gray-50 p-8 rounded-3xl shadow-xl border border-gray-100">
        <div className="flex items-center justify-center gap-5 mb-8">
          <div className="flex flex-col items-center">
            <div className="w-[90px] h-[90px] overflow-hidden relative rounded-2xl shadow-md">
              <img
                src="/ravi-godara.png"
                alt="Agent"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </div>
            <div className="text-center pt-2">
              <h2 className="text-2xl font-bold mb-1 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Get in Touch
              </h2>
              <p className="text-sm text-gray-600">
                We'll get back to you shortly!
              </p>
            </div>
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
              placeholder="Enter your message here"
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
            Send Message
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

export default BottomContactForm;
