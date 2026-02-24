"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { businessTypes } from "@/constant/businessTypes";

const Filter = ({ onFilterChange, cityUrl }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [businessType, setBusinessType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const dropdownRef = useRef(null);

  const propertyTypes = [
    "All Properties",
    "Industrial",
    "Medical/Dental",
    "Warehouse",
    "Retail Store Related",
    "Professional Office",
  ];

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

  const slugifyPropertyType = (type) => {
    if (type === "Retail Store Related") return "retail-store-related";
    return type.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-");
  };

  const propertyTypeFromSlug = (slug) => {
    if (!slug) return null;
    return propertyTypes.find(
      (type) => type !== "All Properties" && slugifyPropertyType(type) === slug,
    );
  };

  useEffect(() => {
    const urlBusinessType = searchParams.get("businessType") || "";
    const urlMinPrice = searchParams.get("minPrice");
    const urlMaxPrice = searchParams.get("maxPrice");

    setBusinessType(urlBusinessType);
    setSelectedPropertyType(propertyTypeFromSlug(urlBusinessType));

    const matchedPriceRange = priceRanges.find(
      (range) =>
        String(range.min) === String(urlMinPrice) &&
        String(range.max) === String(urlMaxPrice),
    );
    setPriceRange(matchedPriceRange?.value || "");
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedFilterChange = useRef(
    debounce(async (filterParams) => {
      try {
        if (typeof onFilterChange === "function") {
          await onFilterChange(filterParams);
        }
      } finally {
        setIsFiltering(false);
      }
    }, 100),
  ).current;

  const pushSearchParams = (updates) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    params.delete("page");
    const query = params.toString();
    const basePath = pathname || (cityUrl ? `/${cityUrl}` : "");
    router.push(query ? `${basePath}?${query}` : basePath);
  };

  const hasActiveFilters = Boolean(
    searchParams.get("businessType") ||
    searchParams.get("minPrice") ||
    searchParams.get("maxPrice"),
  );

  const getCurrentMinPrice = () =>
    searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : null;

  const getCurrentMaxPrice = () =>
    searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : null;

  const handleFilterChange = async (type, value) => {
    if (type === "business") {
      const nextBusinessType = businessType === value ? "" : value;
      setBusinessType(nextBusinessType);
      setSelectedPropertyType(propertyTypeFromSlug(nextBusinessType));
      setIsFiltering(true);
      pushSearchParams({ businessType: nextBusinessType });
      debouncedFilterChange({
        businessType: nextBusinessType || null,
        minPrice: getCurrentMinPrice(),
        maxPrice: getCurrentMaxPrice(),
      });
      return;
    }

    if (type === "propertyType") {
      if (value === "All Properties") {
        setSelectedPropertyType(null);
        setBusinessType("");
        setIsFiltering(true);
        pushSearchParams({ businessType: null });
        debouncedFilterChange({
          businessType: null,
          minPrice: getCurrentMinPrice(),
          maxPrice: getCurrentMaxPrice(),
        });
        setShowDropdown(false);
        return;
      }

      const slugifiedValue = slugifyPropertyType(value);
      setSelectedPropertyType(value);
      setBusinessType(slugifiedValue);
      setIsFiltering(true);
      pushSearchParams({ businessType: slugifiedValue });
      debouncedFilterChange({
        businessType: slugifiedValue,
        minPrice: getCurrentMinPrice(),
        maxPrice: getCurrentMaxPrice(),
      });
      setShowDropdown(false);
      return;
    }

    if (type === "price") {
      setIsFiltering(true);
      const newPriceRange = priceRange === value ? "" : value;
      setPriceRange(newPriceRange);

      const selectedRange = priceRanges.find(
        (range) => range.value === newPriceRange,
      );

      pushSearchParams({
        minPrice: selectedRange ? selectedRange.min : null,
        maxPrice: selectedRange ? selectedRange.max : null,
      });

      debouncedFilterChange({
        businessType: businessType || null,
        minPrice: selectedRange ? selectedRange.min : null,
        maxPrice: selectedRange ? selectedRange.max : null,
      });
    }
  };

  const clearAllFilters = () => {
    setBusinessType("");
    setPriceRange("");
    setSelectedPropertyType(null);
    setShowDropdown(false);
    setIsFiltering(true);
    pushSearchParams({
      businessType: null,
      minPrice: null,
      maxPrice: null,
    });
    debouncedFilterChange({
      businessType: null,
      minPrice: null,
      maxPrice: null,
    });
  };

  return (
    <div className="rounded-lg mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* <div className="flex flex-wrap gap-2">
            {businessTypes
              .filter((type) => type.value !== "retail-lease")
              .map((type) => (
                <button
                  key={type.value}
                  className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                    businessType === type.value
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300"
                  } ${isFiltering ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => handleFilterChange("business", type.value)}
                  disabled={isFiltering}
                >
                  {type.label.split(" for ")[0]}
                </button>
              ))}

            <div ref={dropdownRef} className="relative">
              {selectedPropertyType ? (
                <button
                  className="px-3 py-1.5 text-sm rounded-full bg-blue-600 text-white shadow-md flex items-center gap-1"
                  onClick={() => setShowDropdown(!showDropdown)}
                  disabled={isFiltering}
                >
                  <span>{selectedPropertyType}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform ${showDropdown ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  className={`px-3 py-1.5 text-sm rounded-full transition-all flex items-center gap-1
                    ${
                      showDropdown
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300"
                    }
                    ${isFiltering ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => setShowDropdown(!showDropdown)}
                  disabled={isFiltering}
                >
                  <span>Retail Lease</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform ${showDropdown ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              )}

              {showDropdown && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden">
                  {propertyTypes.map((type) => (
                    <button
                      key={type}
                      className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors
                        ${
                          type === "All Properties"
                            ? "font-semibold border-b border-gray-100 bg-gray-50 text-blue-600"
                            : "text-gray-700"
                        }`}
                      onClick={() => handleFilterChange("propertyType", type)}
                    >
                      {type === "All Properties" && (
                        <span className="mr-2">•</span>
                      )}
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div> */}

          <div className="h-8 w-px bg-gray-200 mx-1"></div>

          <div className="flex flex-wrap gap-2">
            {priceRanges.map((range) => (
              <button
                key={range.value}
                className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                  priceRange === range.value
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300"
                } ${isFiltering ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => handleFilterChange("price", range.value)}
                disabled={isFiltering}
              >
                {range.label}
              </button>
            ))}
            {hasActiveFilters && (
              <button
                className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                  isFiltering
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-gray-50 border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
                onClick={clearAllFilters}
                disabled={isFiltering}
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
