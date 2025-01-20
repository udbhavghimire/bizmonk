"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { businessTypes } from "@/constant/businessTypes";

const Filter = ({ onFilterChange, cityUrl }) => {
  const router = useRouter();
  const [businessType, setBusinessType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

  const priceRanges = [
    { label: "$0 - 500k", value: "0-500000", min: 0, max: 500000 },
    {
      label: "$500k - $999k",
      value: "500000-999000",
      min: 500000,
      max: 999000,
    },
    {
      label: "1mil - 1.5mil",
      value: "1000000-1500000",
      min: 1000000,
      max: 1500000,
    },
  ];

  const handleFilterChange = async (type, value) => {
    if (type === "business") {
      setBusinessType(value);
      const selectedType = businessTypes.find((t) => t.value === value);
      if (selectedType) {
        router.push(`/${cityUrl}/${selectedType.path}`);
      }
    } else if (type === "price") {
      setIsFiltering(true);
      try {
        const newPriceRange = priceRange === value ? "" : value;
        setPriceRange(newPriceRange);

        const selectedRange = priceRanges.find(
          (range) => range.value === newPriceRange
        );

        await onFilterChange({
          businessType,
          priceRange: selectedRange
            ? {
                min: selectedRange.min,
                max: selectedRange.max,
              }
            : null,
        });
      } finally {
        setIsFiltering(false);
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      <div className="relative w-48">
        <select
          className="text-black w-full appearance-none bg-white border-2 border-gray-300 rounded-full px-3 py-1.5 text-sm cursor-pointer hover:border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={businessType}
          onChange={(e) => handleFilterChange("business", e.target.value)}
          disabled={isFiltering}
        >
          <option value="">Business Type</option>
          {businessTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg
            className="w-3 h-3 fill-current text-gray-600"
            viewBox="0 0 20 20"
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>

      {priceRanges.map((range) => (
        <button
          key={range.value}
          className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
            priceRange === range.value
              ? "bg-gray-900 text-white"
              : "bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400"
          } ${isFiltering ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => handleFilterChange("price", range.value)}
          disabled={isFiltering}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
};

export default Filter;
