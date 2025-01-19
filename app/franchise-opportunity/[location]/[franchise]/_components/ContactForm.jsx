"use client";
import Image from "next/image";
import React, { useState } from "react";

const ContactForm = ({ contactImage }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Email:", email);
    console.log("Phone:", phone);
    // Reset form fields if needed
    setEmail("");
    setPhone("");
  };

  return (
    <div
      id="contact"
      className="relative max-w-[60rem] mx-4 md:mx-auto bg-slate-50 rounded-2xl overflow-hidden shadow-xl border-1 mb-20"
    >
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
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4  max-w-72">
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
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="max-w-56 py-2 px-4 bg-primary text-white rounded-md hover:bg-opacity-90"
            >
              Submit
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
