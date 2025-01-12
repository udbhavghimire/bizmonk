import Link from "next/link";
import React from "react";

const PropertyDisplaySection = ({
  title,
  subtitle,
  exploreAllLink,
  children,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:rounded-md bg-gradient-to-r from-blue-600/15 to-pink-500/15 my-24">
      <div className="my-2 ">
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-semibold w-[100%] sm:w-auto text-black">
            {title}
          </h3>
          <Link href={exploreAllLink || "#"} className="hidden sm:inline">
            <button className="border-black font-bold border-2 inline px-1 sm:px-3 py-2 rounded-md text-sm sm:text-md text-black hover:scale-105">
              Explore All
            </button>
          </Link>
        </div>
        {subtitle && (
          <h5 className="font-md text-xs sm:text-md sm:mt-1">{subtitle}</h5>
        )}
      </div>
      {children}
      <div className="flex justify-center">
        <Link href={exploreAllLink || "#"} className="sm:hidden">
          <button className="font-semibold border-2 inline px-3 sm:px-3 py-2 rounded-full text-sm mt-1 sm:text-md hover:scale-105 bg-white text-black">
            Explore All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PropertyDisplaySection;
