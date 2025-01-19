import Link from "next/link";
import React from "react";
// import { ArrowRightIcon } from "@heroicons/react/24/outline";

const TextWithContactButton = ({ title, subtitle, textContent, imgSrc }) => {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-primary">{title}</span>
          </h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p>{textContent}</p>
            </div>

            {/* Franchise Categories */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { name: "Office Spaces", count: "500+" },
                { name: "Convenience Stores", count: "300+" },
                { name: "Restaurants", count: "400+" },
                { name: "Franchises", count: "25+" },
              ].map((category) => (
                <div
                  key={category.name}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                >
                  <p className="font-semibold text-gray-900">{category.name}</p>
                  <p className="text-primary text-sm">
                    {category.count} opportunities
                  </p>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <Link
                  href="tel:(647) 123-4567"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-colors duration-300"
                >
                  Contact us
                </Link>
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Schedule a Consultation
                  </p>
                  <p className="text-sm text-gray-600">
                    Our experts are ready to help you
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={imgSrc}
                alt="Franchise Opportunities"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            {/* Stats Overlay */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Success Rate", value: "95%" },
                  { label: "Locations", value: "500+" },
                  { label: "Investment Range", value: "$100K-2M" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl font-bold text-primary">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextWithContactButton;
