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
      className="relative max-w-[60rem] mx-4 md:mx-auto bg-slate-50 rounded-2xl overflow-hidden shadow-xl border-1 mb-20"
    >
      {/* Notification */}
      {notification.message && (
        <div
          className={`absolute top-4 left-4 right-4 z-10 p-4 rounded-md shadow-lg ${
            notification.type === "success"
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <span>{notification.message}</span>
            <button
              onClick={() => setNotification({ message: "", type: "" })}
              className="ml-4 text-xl font-bold hover:opacity-70"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-5">
        <div className="sm:col-span-3 px-8 flex flex-col space-y-12 mt-8 mb-4 md:mb-0">
          <h2 className="text-4xl font-semibold text-primary self-start">
            Contact Us Now!
          </h2>
          <form onSubmit={handleSubmit} className="">
            <div className="mb-4 max-w-72">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                disabled={isLoading}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="mb-4 max-w-72">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone:
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                disabled={isLoading}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="max-w-56 py-2 px-4 bg-primary text-white rounded-md hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
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
                  Sending...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
        <div className="sm:col-span-2 w-full h-full">
          <Image
            src={contactImage}
            className="w-full"
            alt="contact-image"
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
