"use client";

import React from "react";
import Link from "next/link";
import gtaCities from "@/data/gta-cities.json";

const commercialTypes = [
  { label: "Convenience Stores", path: "convenience-stores-for-sale" },
  { label: "Restaurants", path: "restaurants-for-sale" },
  { label: "Office Spaces", path: "offices-for-lase" },
  { label: "Franchises", path: "franchises" },
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
        href: `/commercial/ontario/${citySlug}/${type.path}-for-sale`,
        text: `${type.label} for sale in ${city}`,
      })),
      priceRanges: commercialTypes.flatMap((type) =>
        priceRanges.map((range) => ({
          href: `/commercial/ontario/${citySlug}/${type.path}-${range.label
            .toLowerCase()
            .replace(/ /g, "-")}`,
          text: `${type.label} in ${city} ${range.label}`,
        }))
      ),
      office: {
        href: `/commercial/ontario/${citySlug}/office-spaces-for-lease`,
        text: `Office Spaces for lease in ${city}`,
      },
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
              <Link
                href={`/commercial/ontario/${city
                  .toLowerCase()
                  .replace(/ /g, "-")}`}
              >
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

              {/* Price Ranges */}
              <div className="">
                <h3 className="text-[16px] font-semibold">
                  Properties by Price Range
                </h3>
                {categories.priceRanges.map((link, index) => (
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

              {/* Office Spaces for Lease */}
              <div className="py-2">
                <h3 className="text-[16px] font-semibold">Office Spaces</h3>
                <div>
                  <Link
                    href={categories.office.href}
                    className="text-gray-700 hover:text-blue-800 text-[14px]"
                  >
                    {categories.office.text}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
