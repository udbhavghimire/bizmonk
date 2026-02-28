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
      <div className="relative w-full">
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full p-1.5 focus-within:shadow-sm focus-within:border-gray-300 transition-all duration-200">
          <div className="flex-1 flex items-center px-6">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
              placeholder="Search businesses or cities..."
              className="w-full bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 text-base px-0"
              style={{ boxShadow: "none" }}
            />
          </div>
          <button 
             onClick={handleSearchSubmit}
             className="bg-primary text-white md:px-8 px-6 py-3 rounded-full font-semibold text-sm md:text-base hover:bg-blue-700 transition-colors">
            Search
          </button>
        </div>

        {suggestions.length > 0 && (
          <div
            className="absolute top-16 z-20 w-full bg-white rounded-2xl shadow-xl 
                       border border-gray-100 overflow-hidden backdrop-blur-sm"
          >
            <ul className="max-h-72 overflow-auto py-2">
              {suggestions.map((city) => (
                <li
                  key={city}
                  onClick={() => handleSelect(city)}
                  className="px-6 py-3 hover:bg-gray-50 cursor-pointer flex items-center space-x-3
                             transition-colors duration-200"
                >
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900 font-medium text-base">{city}</span>
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
    <div className="relative w-full">
      <div className="relative flex items-center">
        <MagnifyingGlassIcon className="absolute left-3 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by city..."
          className="w-full pl-9 py-2 text-sm border border-gray-200 rounded-full
                     focus:outline-none focus:ring-0 focus:border-black
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
