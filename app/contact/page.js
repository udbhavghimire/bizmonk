"use client";
import { useState } from "react";
import BottomContactForm from "@/components/BottomContactForm";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600">
            Looking For Restaurants, Convenience Store and Commercial Space in
            GTA?
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <BottomContactForm />
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Address */}
            <div className="bg-white p-4 rounded-3xl shadow-lg text-center">
              <div className="flex justify-center mb-4">
                <FaMapMarkerAlt className="text-2xl text-gray-800" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600 text-sm">
                1065 Canadian Pl Suite 207 Mississauga, ON L4W 0C2
              </p>
            </div>

            {/* Phone */}
            <div className="bg-white p-4 rounded-3xl shadow-lg text-center">
              <div className="flex justify-center mb-4">
                <FaPhone className="text-2xl text-gray-800" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm">
                <a href="tel:+19052267284" className="hover:text-gray-800">
                  (905) 226-7284
                </a>
              </p>
            </div>

            {/* Email */}
            <div className="bg-white p-4 rounded-3xl shadow-lg text-center">
              <div className="flex justify-center mb-4">
                <FaEnvelope className="text-2xl text-gray-800" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm">
                <a
                  href="mailto:info@bizmonk.ca"
                  className="hover:text-gray-800"
                >
                  info@bizmonk.ca
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="container mx-auto px-4 py-12 pt-32">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.2685069372707!2d-79.6253863!3d43.6453097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3854b48559d9%3A0x808099e40df9f8d0!2s1065%20Canadian%20Pl%20Suite%20207%2C%20Mississauga%2C%20ON%20L4W%200C2!5e0!3m2!1sen!2sca!4v1710799149408!5m2!1sen!2sca"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}
