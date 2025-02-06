"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import citiesData from "@/data/gta-cities.json";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { startNavigationLoading } from "@/app/utils/navigation";

// Helper function to convert city names to URL-friendly format
const toUrlFormat = (cityName) => cityName.toLowerCase().replace(/\s+/g, "-");

// Popular cities to show as quick links
const popularCities = [
  "Toronto",
  "Oakville",
  "Mississauga",
  "Milton",
  "Brampton",
  "Markham",
  "Vaughan",
];

export default function SearchBar({ variant = "default" }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  const handleSearch = (value) => {
    setQuery(value);
    if (value.length > 0) {
      const filtered = citiesData.cities.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (city) => {
    startNavigationLoading();
    setQuery("");
    setSuggestions([]);
    const cityUrl = toUrlFormat(city);
    router.push(`/${cityUrl}`);
  };

  const handleSearchSubmit = () => {
    if (query.trim()) {
      startNavigationLoading();
      const cityUrl = toUrlFormat(query);
      router.push(`/${cityUrl}`);
    }
  };

  if (variant === "hero") {
    return (
      <div className="relative w-full max-w-3xl mx-auto">
        <div className="relative">
          <div className="relative flex items-center">
            <MagnifyingGlassIcon className="absolute left-4 h-5 w-5 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
              placeholder="Search business opportunities"
              className="w-full pl-12 pr-32 py-3.5 text-base border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                         transition-all duration-200 bg-white shadow-sm
                         text-gray-900 placeholder-gray-400"
            />
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-3">
            <div className="h-6 w-[1px] bg-gray-200"></div>
            <button
              onClick={handleSearchSubmit}
              className="px-4 py-1.5  bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-md hover:bg-primary/90 
                         transition-all duration-200 text-sm font-medium shadow-sm
                         hover:shadow-md active:scale-95"
            >
              Search
            </button>
          </div>
        </div>

        {/* Quick city links */}
        <div className="mt-8 flex flex-wrap md:gap-4 gap-2 justify-center">
          {popularCities.map((city) => (
            <Link
              key={city}
              href={`/${toUrlFormat(city)}`}
              onClick={startNavigationLoading}
              className="px-4 py-1.5 text-sm bg-white/80 backdrop-blur-sm rounded-full
                         text-gray-600 hover:text-primary border border-gray-200
                         transition-all duration-200 hover:shadow-md hover:-translate-y-0.5
                         hover:border-primary/20"
            >
              {city}
            </Link>
          ))}
        </div>

        {suggestions.length > 0 && (
          <div
            className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg 
                       border border-gray-100 overflow-hidden backdrop-blur-sm"
          >
            <ul className="max-h-72 overflow-auto">
              {suggestions.map((city) => (
                <li
                  key={city}
                  onClick={() => handleSelect(city)}
                  className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center space-x-3
                             transition-colors duration-200 border-b border-gray-50 last:border-none"
                >
                  <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700 text-sm">{city}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // Default variant (for navbar)
  return (
    <div className="relative">
      <div className="relative flex items-center">
        <MagnifyingGlassIcon className="absolute left-3 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by city..."
          className="w-[280px] pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-md
                     focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary
                     transition-all duration-200 bg-white/90 text-gray-900"
        />
      </div>

      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-100">
          <ul className="max-h-60 overflow-auto">
            {suggestions.map((city) => (
              <li
                key={city}
                onClick={() => handleSelect(city)}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700
                           border-b border-gray-50 last:border-none"
              >
                {city}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
