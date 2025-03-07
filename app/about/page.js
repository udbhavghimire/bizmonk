"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./about.module.css";

export default function About() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center text-gray-900 mb-16"
          {...fadeIn}
        >
          About BizMonk
        </motion.h1>

        <div className="space-y-16">
          <motion.section
            {...fadeIn}
            className="bg-white rounded-lg shadow-sm p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to BizMonk, your premier destination for finding the
              perfect commercial space in the Greater Toronto Area. We
              specialize in connecting business owners with ideal locations for
              restaurants, convenience stores, franchises, and various
              commercial ventures across Ontario. Our platform makes it simple
              to discover and secure the business space that matches your
              vision.
            </p>
          </motion.section>

          <motion.section
            {...fadeIn}
            className="bg-white rounded-lg shadow-sm p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Vision & Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our vision is to become Ontario's most trusted platform for
              commercial real estate and business space solutions. We are
              committed to empowering entrepreneurs and business owners by
              providing them with access to premium commercial spaces and
              comprehensive market insights. Our mission is to simplify the
              process of finding and securing the perfect business location in
              the GTA and beyond.
            </p>
          </motion.section>

          <motion.section
            {...fadeIn}
            className="bg-white rounded-lg shadow-sm p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Why Choose BizMonk?
            </h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-blue-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Extensive network of premium commercial spaces in GTA
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-blue-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Specialized expertise in restaurant and retail locations
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-blue-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Tailored solutions for franchises and business owners
                </span>
              </li>
            </ul>
          </motion.section>

          <motion.section
            {...fadeIn}
            className="bg-white rounded-lg shadow-sm p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              What We Do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Restaurant Spaces
                </h3>
                <p className="text-gray-600">
                  Prime locations for restaurants, cafes, and food service
                  businesses
                </p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Retail Solutions
                </h3>
                <p className="text-gray-600">
                  Ideal spaces for convenience stores and retail businesses
                </p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Franchise Opportunities
                </h3>
                <p className="text-gray-600">
                  Strategic locations for franchise expansion and growth
                </p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Market Analysis
                </h3>
                <p className="text-gray-600">
                  Comprehensive insights into Ontario's commercial real estate
                  market
                </p>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
