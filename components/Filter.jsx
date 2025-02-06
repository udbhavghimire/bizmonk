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
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <div className="flex gap-2">
        {businessTypes.map((type) => (
          <button
            key={type.value}
            className={`px-3 md:py-1.5 py-1 md:text-sm text-[12px] rounded-full transition-colors ${
              businessType === type.value
                ? "bg-gray-900 text-white"
                : "bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400"
            } ${isFiltering ? "opacity-50" : ""}`}
            onClick={() => handleFilterChange("business", type.value)}
            disabled={isFiltering}
          >
            {type.label.split(" for ")[0]}
          </button>
        ))}
      </div>

      {priceRanges.map((range) => (
        <button
          key={range.value}
          className={`px-3 md:py-1.5 py-1 md:text-sm text-[12px] rounded-full transition-colors ${
            priceRange === range.value
              ? "bg-gray-900 text-white"
              : "bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400"
          } ${isFiltering ? "opacity-50" : ""}`}
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
