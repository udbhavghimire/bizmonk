"use client";
import React from "react";
import ResaleCard from "./ResaleCard";
import Link from "next/link";

const HomepageListing = ({ bramptonRestaurants, bramptonStores, torontoCommercial }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* Brampton Restaurants Section */}
      <div className="mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Restaurants for Sale in Brampton
          </h2>
          <p className="text-gray-600 text-lg">
            Discover profitable restaurant opportunities in Brampton
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {bramptonRestaurants?.slice(0, 5).map((listing) => (
            <ResaleCard key={listing.ListingKey} curElem={listing} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link 
            href="/brampton/restaurant-for-sale" 
            className="text-primary hover:text-primary/80 font-semibold text-lg"
          >
            View All Brampton Restaurants →
          </Link>
        </div>
      </div>

      {/* Brampton Convenience Stores Section */}
      <div className="mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Affordable Convenience Stores in Brampton under 500k
          </h2>
          <p className="text-gray-600 text-lg">
            Convenience stores under $500,000 in Brampton
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {bramptonStores?.slice(0, 5).map((listing) => (
            <ResaleCard key={listing.ListingKey} curElem={listing} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link 
            href="/brampton/convenience-store-for-sale" 
            className="text-primary hover:text-primary/80 font-semibold text-lg"
          >
            View All Brampton Convenience Stores →
          </Link>
        </div>
      </div>

      {/* Toronto Commercial Space Section */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Commercial Space for Lease in Toronto
          </h2>
          <p className="text-gray-600 text-lg">
            Prime commercial locations available in Toronto
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {torontoCommercial?.slice(0, 5).map((listing) => (
            <ResaleCard key={listing.ListingKey} curElem={listing} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link 
            href="/toronto/offices-for-lease" 
            className="text-primary hover:text-primary/80 font-semibold text-lg"
          >
            View All Toronto Commercial Spaces →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomepageListing;
