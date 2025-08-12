import Link from "next/link";
import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const PropertyDisplaySection = ({
  title,
  subtitle,
  exploreAllLink,
  children,
}) => {
  return (
    <div className="relative py-24">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-3">
          <div className="flex flex-row sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-bold">
                <span className="text-black">{title}</span>
              </h2>
              {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
            </div>

            {/* Desktop Explore Button */}
            <Link
              href={exploreAllLink || "#"}
              className="hidden sm:inline-flex items-center justify-center px-6 py-3 
                       text-base font-medium text-primary bg-white border-2 
                       border-primary rounded-full hover:bg-primary/5 
                       transition-all duration-300 group"
            >
              Explore All
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Content Section */}
        <div className="relative">
          {/* Main Content */}
          <div className="bg-white">{children}</div>
        </div>

        {/* Mobile Explore Button */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href={exploreAllLink || "#"}
            className="inline-flex items-center justify-center px-6 py-3 
                     text-base font-medium text-primary bg-white border-2 
                     border-primary rounded-full hover:bg-primary/5 
                     transition-all duration-300 group"
          >
            Explore All
            <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyDisplaySection;
