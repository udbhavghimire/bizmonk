"use client";
import { sendEmail } from "@/api/resend";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const ContactForm = ({ contactImage }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const pathname = usePathname();

  const showNotification = (message, type) => {
    setNotification({ message, type });
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Submitting form...");
      const response = await sendEmail({
        content: [
          `Email: ${email}`,
          `Phone: ${phone}`,
          `Source Page: https://bizmonk.ca/${pathname}`,
        ],
        title: "Info from Bizmonk",
      });

      // Check if the response indicates success
      if (response && !response.error) {
        showNotification(
          "Thank you! Your message has been sent successfully.",
          "success"
        );
        // Reset form fields on success
        setEmail("");
        setPhone("");
      } else {
        throw new Error(response?.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      showNotification(
        "Sorry, there was an error sending your message. Please try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="contact"
      className="relative md:mx-auto md:max-w-5xl md:px-4 mx-4 mb-20"
    >
      {/* Notification */}
      {notification.message && (
        <div
          className={`fixed top-4 left-4 right-4 md:absolute md:top-6 md:left-6 md:right-6 z-50 p-4 rounded-xl shadow-2xl backdrop-blur-sm transition-all duration-300 transform ${
            notification.type === "success"
              ? "bg-emerald-50/95 border border-emerald-200 text-emerald-800"
              : "bg-red-50/95 border border-red-200 text-red-800"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {notification.type === "success" ? (
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <span className="font-medium">{notification.message}</span>
            </div>
            <button
              onClick={() => setNotification({ message: "", type: "" })}
              className="ml-4 text-xl font-bold hover:opacity-70 transition-opacity p-1"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Main Form Container */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 backdrop-blur-sm">
        <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[600px]">
          {/* Form Section */}
          <div className="lg:col-span-3 p-8 md:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full lg:mx-0">
              {/* Header */}
              <div className="mb-10 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 leading-tight">
                  Get In Touch
                </h2>
                <p className="text-gray-600 text-lg">
                  Ready to take your business to the next level?
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="group">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      disabled={isLoading}
                      placeholder="your@email.com"
                      className="w-full px-4 py-4 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 focus:bg-white"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Phone Field */}
                <div className="group">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      disabled={isLoading}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-4 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 focus:bg-white"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Sending Message...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span>Send Message</span>
                      <svg
                        className="ml-2 w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </div>
                  )}
                </button>

                {/* Privacy Note */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  We respect your privacy. Your information will only be used to
                  contact you.
                </p>
              </form>
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:col-span-2 relative bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
            <div className="relative w-full h-64 lg:h-full min-h-[300px] lg:min-h-[500px]">
              <Image
                src={contactImage}
                className="object-cover rounded-2xl shadow-lg"
                alt="Contact us"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
              {/* Overlay for better contrast on mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl lg:hidden"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-indigo-200/30 rounded-full blur-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
