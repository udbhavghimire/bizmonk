"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import citiesData from "@/data/gta-cities.json";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// Helper function to convert city names to URL-friendly format
const toUrlFormat = (cityName) => cityName.toLowerCase().replace(/\s+/g, "-");

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
    setQuery("");
    setSuggestions([]);
    const cityUrl = toUrlFormat(city);
    router.push(`/${cityUrl}`);
  };

  if (variant === "hero") {
    return (
      <div className="relative w-full max-w-3xl mx-auto">
        <div className="relative">
          <div className="relative flex items-center">
            <MagnifyingGlassIcon className="absolute left-4 h-6 w-6 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search business opportunities by city..."
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-full 
                         shadow-lg focus:outline-none focus:border-primary 
                         transition-all duration-300 bg-white/90 backdrop-blur-sm
                         text-gray-900 placeholder-gray-400"
            />
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex space-x-2">
            <div className="h-8 w-[1px] bg-gray-300"></div>
            <button
              onClick={() => handleSearch(query)}
              className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 
                         transition-colors duration-300 text-sm font-medium"
            >
              Search
            </button>
          </div>
        </div>

        {suggestions.length > 0 && (
          <div
            className="absolute z-10 w-full mt-2 bg-white rounded-2xl shadow-xl 
                         border border-gray-100 overflow-hidden"
          >
            <ul className="max-h-72 overflow-auto divide-y divide-gray-100">
              {suggestions.map((city) => (
                <li
                  key={city}
                  onClick={() => handleSelect(city)}
                  className="px-6 py-3 hover:bg-gray-50 cursor-pointer flex items-center space-x-3
                             transition-colors duration-200"
                >
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{city}</span>
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
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by city..."
          className="w-[300px] px-4 py-2 border border-gray-300 rounded-md text-black"
        />
      </div>

      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
          <ul className="max-h-60 overflow-auto">
            {suggestions.map((city) => (
              <li
                key={city}
                onClick={() => handleSelect(city)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
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
