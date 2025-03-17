"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { businessTypes } from "@/constant/businessTypes";

const Filter = ({ onFilterChange, cityUrl }) => {
  const router = useRouter();
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
    "Professional Office"
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounce function to make search faster
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Debounced filter change handler
  const debouncedFilterChange = useRef(
    debounce(async (filterParams) => {
      try {
        await onFilterChange(filterParams);
      } finally {
        setIsFiltering(false);
      }
    }, 100)
  ).current;

  // Function to slugify property type names
  const slugifyPropertyType = (type) => {
    if (type === "Retail Store Related") return "retail-store-related";
    return type.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');
  };

  // Function to get display name from slug
  const getDisplayNameFromSlug = (slug) => {
    const displayMap = {
      'medical-dental': 'Medical/Dental',
      'professional-office': 'Professional Office',
      'retail-store-related': 'Retail Store Related'
    };
    return displayMap[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
  };

  const handleFilterChange = async (type, value) => {
    if (type === "business") {
      setBusinessType(value);
      const selectedType = businessTypes.find((t) => t.value === value);
      if (selectedType) {
        const basePath = cityUrl ? `/${cityUrl}` : '';
        router.push(`${basePath}/${selectedType.path}`);
      }
    } else if (type === "propertyType") {
      // Handle "All Properties" selection
      if (value === "All Properties") {
        setSelectedPropertyType(null);
        // Navigate to the main retail-lease page
        const basePath = cityUrl ? `/${cityUrl}` : '';
        router.push(`${basePath}/retail-lease`);
        
        // Apply filter immediately
        setIsFiltering(true);
        debouncedFilterChange({
          propertyType: null,
          priceRange: null
        });
        return;
      }
      
      // For specific property types, navigate with slugified query parameter
      setSelectedPropertyType(value);
      const basePath = cityUrl ? `/${cityUrl}` : '';
      const slugifiedValue = slugifyPropertyType(value);
      
      // Apply filter immediately before navigation
      setIsFiltering(true);
      debouncedFilterChange({
        propertyType: value,
        priceRange: priceRanges.find((range) => range.value === priceRange)
          ? {
              min: priceRanges.find((range) => range.value === priceRange).min,
              max: priceRanges.find((range) => range.value === priceRange).max,
            }
          : null,
      });
      
      // Then navigate
      router.push(`${basePath}/retail-lease?type=${encodeURIComponent(slugifiedValue)}`);
      setShowDropdown(false);
    } else if (type === "price") {
      setIsFiltering(true);
      const newPriceRange = priceRange === value ? "" : value;
      setPriceRange(newPriceRange);

      const selectedRange = priceRanges.find(
        (range) => range.value === newPriceRange
      );

      // Navigate with price range parameters if we have them
      if (selectedRange) {
        const basePath = cityUrl ? `/${cityUrl}` : '';
        const slugifiedType = selectedPropertyType ? slugifyPropertyType(selectedPropertyType) : '';
        const typeParam = selectedPropertyType ? `&type=${encodeURIComponent(slugifiedType)}` : '';
        router.push(`${basePath}/retail-lease?price=${newPriceRange}${typeParam}`);
      }

      debouncedFilterChange({
        propertyType: selectedPropertyType,
        priceRange: selectedRange
          ? {
              min: selectedRange.min,
              max: selectedRange.max,
            }
          : null,
      });
    }
  };

  // Function to reset property type filter
  const resetPropertyType = async () => {
    setSelectedPropertyType(null);
    // Navigate to the main retail-lease page
    const basePath = cityUrl ? `/${cityUrl}` : '';
    router.push(`${basePath}/retail-lease`);
    
    // Reset filters and show all properties
    setIsFiltering(true);
    debouncedFilterChange({
      propertyType: null,
      priceRange: priceRanges.find((range) => range.value === priceRange)
        ? {
            min: priceRanges.find((range) => range.value === priceRange).min,
            max: priceRanges.find((range) => range.value === priceRange).max,
          }
        : null,
    });
  };

  return (
    <div className=" rounded-lg  mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Business Type Filters */}
          <div className="flex flex-wrap gap-2">
            {/* Regular business type buttons (except retail-lease) */}
            {businessTypes
              .filter(type => type.value !== "retail-lease")
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
              
            {/* Retail Lease dropdown */}
            <div ref={dropdownRef} className="relative">
              {selectedPropertyType ? (
                <div className="flex items-center gap-1">
                  <button
                    className="px-3 py-1.5 text-sm rounded-full bg-blue-600 text-white shadow-md flex items-center gap-1"
                    onClick={() => setShowDropdown(!showDropdown)}
                    disabled={isFiltering}
                  >
                    <span>{selectedPropertyType}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <button
                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                    onClick={resetPropertyType}
                    disabled={isFiltering}
                    title="Clear filter"
                  >
                    <span className="text-xs">✕</span>
                  </button>
                </div>
              ) : (
                <button
                  className={`px-3 py-1.5 text-sm rounded-full transition-all flex items-center gap-1
                    ${showDropdown 
                      ? "bg-blue-600 text-white shadow-md" 
                      : "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300"}
                    ${isFiltering ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => setShowDropdown(!showDropdown)}
                  disabled={isFiltering}
                >
                  <span>Retail Lease</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
              
              {showDropdown && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden">
                  {propertyTypes.map((type) => (
                    <button
                      key={type}
                      className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors
                        ${type === "All Properties" 
                          ? "font-semibold border-b border-gray-100 bg-gray-50 text-blue-600" 
                          : "text-gray-700"}`}
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
          </div>
          
          {/* Divider */}
          <div className="h-8 w-px bg-gray-200 mx-1"></div>
          
          {/* Price Range Filters */}
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
          </div>
        </div>
        
        {/* Loading Indicator - moved to right */}
        {isFiltering && (
          <div className="flex items-center text-sm text-blue-600 ml-auto">
            <svg className="animate-spin mr-2 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
