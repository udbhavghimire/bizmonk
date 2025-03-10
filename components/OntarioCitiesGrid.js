"use client";

import React from "react";
import Link from "next/link";
import gtaCities from "@/data/gta-cities.json";

const commercialTypes = [
  { label: "Convenience Stores", path: "convenience-store-for-sale" },
  { label: "Restaurants", path: "restaurant-for-sale" },
  { label: "Retail Leases", path: "retail-lease" },
  { label: "Franchises", path: "franchise-opportunity" },
];

const priceRanges = [
  { maxPrice: 500000, label: "Under 500k" },
  { maxPrice: 1000000, label: "Under 1M" },
  { maxPrice: 1500000, label: "Under 1.5M" },
];

export default function OntarioCitiesGrid() {
  const generateCategorizedLinks = (city) => {
    const citySlug = city.toLowerCase().replace(/ /g, "-");

    // Organize links by category
    const categories = {
      commercialTypes: commercialTypes.map((type) => ({
        href:
          type.path === "franchise-opportunity"
            ? `/franchise-opportunity/${citySlug}`
            : `/${citySlug}/${type.path}`,
        text:
          type.path === "franchise-opportunity"
            ? `Franchise Opportunities in ${city}`
            : `${type.label} ${
                type.path.includes("lease") ? "for lease" : "for sale"
              } in ${city}`,
      })),
    };

    return categories;
  };

  const sortedCities = [...gtaCities.cities].sort((a, b) => a.localeCompare(b));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="md:text-4xl text-2xl font-bold mb-1 pt-4">
          Commercial Properties & Franchises in Ontario
        </h1>
        <p className="text-gray-700 pb-14 md:text-lg text-sm">
          Discover commercial properties and franchise opportunities across
          Ontario
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sortedCities.map((city) => {
          const categories = generateCategorizedLinks(city);
          return (
            <div key={city} className="space-y-4">
              <Link href={`/${city.toLowerCase().replace(/ /g, "-")}`}>
                <h2 className="text-3xl font-bold mb-6 text-black hover:text-blue-800 pt-6">
                  {city}
                </h2>
              </Link>

              {/* Commercial Property Types */}
              <div className="py-2">
                <h3 className="text-[16px] font-semibold">
                  Commercial Properties by Type
                </h3>
                {categories.commercialTypes.map((link, index) => (
                  <div key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-700 hover:text-blue-800 text-[14px]"
                    >
                      {link.text}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
