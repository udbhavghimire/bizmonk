"use client";
import React from "react";
import ResaleCard from "./ResaleCard";
import Link from "next/link";

const HomepageListing = ({
  bramptonRestaurants,
  bramptonStores,
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
          <button
            asChild
            className="block text-center px-6 py-3 bg-black text-white rounded-full hover:bg-primary/90 transition-colors font-medium text-nowrap max-w-lg"
          >
            <Link href="/brampton/restaurant-for-sale" className="">
              View All Brampton Restaurants
            </Link>
          </button>
        </div>
      </div>

      {/* Brampton Convenience Stores Section */}
      <div className="mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Affordable Convenience Stores in Brampton under 500k
          </h2>
          <p className="text-gray-600 text-lg">
            Convenience stores under $500,000 in Brampton
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {bramptonStores?.slice(0, 8).map((listing) => (
            <ResaleCard key={listing.ListingKey} curElem={listing} />
          ))}
        </div>
        <div className="text-center mt-8 flex w-full justify-center">
          <button
            asChild
            className="block text-center px-6 py-3 bg-black text-white rounded-full hover:bg-primary/90 transition-colors font-medium text-nowrap max-w-lg"
          >
            <Link href="/brampton/convenience-store-for-sale" className="">
              View All Brampton Convenience Stores
            </Link>
          </button>
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
