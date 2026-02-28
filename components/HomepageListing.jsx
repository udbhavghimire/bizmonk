"use client";
import React from "react";
import ResaleCard from "./ResaleCard";
import Link from "next/link";

const HomepageListing = ({
  bramptonRestaurants,
  torontoCommercial,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* Brampton Restaurants Section */}
      <div className="mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Restaurants for Sale Under $300k in Brampton
          </h2>
          <p className="text-gray-600 text-lg">
            Affordable restaurant opportunities under $300,000 in Brampton
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {bramptonRestaurants?.slice(0, 8).map((listing) => (
            <ResaleCard key={listing.ListingKey} curElem={listing} />
          ))}
        </div>
        <div className="text-center mt-8 w-full flex justify-center">
          <div className="text-center mt-8 w-full flex justify-center">
            <Link
              href={`/brampton?businessType=restaurant`}
              className="block text-center px-6 py-3 bg-black text-white rounded-full hover:bg-primary/90 transition-colors font-medium text-nowrap max-w-lg"
            >
              View All Brampton Restaurants
            </Link>
          </div>
        </div>
      </div>

      {/* Toronto Commercial Space Section */}
      {/* <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Commercial Space for Lease in Toronto
          </h2>
          <p className="text-gray-600 text-lg">
            Prime commercial locations available in Toronto
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {torontoCommercial?.slice(0, 8).map((listing) => (
            <ResaleCard key={listing.ListingKey} curElem={listing} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link 
            href="/toronto/retail-lease" 
            className="text-blue-600 hover:text-primary/80 font-semibold text-lg"
          >
            View All Toronto Commercial Spaces →
          </Link>
        </div>
      </div> */}
    </div>
  );
};

export default HomepageListing;
