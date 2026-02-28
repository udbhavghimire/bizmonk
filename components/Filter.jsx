"use client";
import { useState, useEffect, useRef, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const MAX_PRICE = 2000000;

const formatPrice = (value) =>
  `$${Math.round(Number(value || 0)).toLocaleString("en-US")}`;

const clampPrice = (value) => {
  const num = Number(value);
  if (!Number.isFinite(num)) return 0;
  return Math.min(MAX_PRICE, Math.max(0, num));
};

const Filter = ({ onFilterChange, onPendingChange, cityUrl }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isRoutePending, startRouteTransition] = useTransition();

  const [businessType, setBusinessType] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [showBusinessModal, setShowBusinessModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [sort, setSort] = useState("newest");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(MAX_PRICE);

  const businessModalRef = useRef(null);
  const priceModalRef = useRef(null);
  const sortModalRef = useRef(null);

  const businessTypeOptions = [
    { label: "Restaurant", value: "restaurant" },
    { label: "Convenience Store", value: "convenience-store" },
    { label: "Medical/Dental", value: "medical-dental" },
  ];
  const sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Lowest Price", value: "price_asc" },
    { label: "Highest Price", value: "price_desc" },
  ];

  useEffect(() => {
    const urlBusinessType = searchParams.get("businessType") || "";
    const urlSort = searchParams.get("sort") || "newest";
    const urlMinPrice = searchParams.get("minPrice");
    const urlMaxPrice = searchParams.get("maxPrice");

    const nextMin = clampPrice(urlMinPrice ?? 0);
    const nextMax = clampPrice(urlMaxPrice ?? MAX_PRICE);

    setBusinessType(urlBusinessType);
    setSort(urlSort);
    setPriceMin(Math.min(nextMin, nextMax));
    setPriceMax(Math.max(nextMin, nextMax));
  }, [searchParams]);

  useEffect(() => {
    if (typeof onPendingChange === "function") {
      onPendingChange(isRoutePending);
    }
  }, [isRoutePending, onPendingChange]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        businessModalRef.current &&
        !businessModalRef.current.contains(event.target)
      ) {
        setShowBusinessModal(false);
      }
      if (
        priceModalRef.current &&
        !priceModalRef.current.contains(event.target)
      ) {
        setShowPriceModal(false);
      }
      if (sortModalRef.current && !sortModalRef.current.contains(event.target)) {
        setShowSortModal(false);
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
    startRouteTransition(() => {
      router.push(query ? `${basePath}?${query}` : basePath);
    });
  };

  const getCurrentMinPrice = () =>
    searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : null;

  const getCurrentMaxPrice = () =>
    searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : null;

  const hasActiveFilters = Boolean(
    searchParams.get("businessType") ||
    searchParams.get("minPrice") ||
    searchParams.get("maxPrice"),
  );

  const hasActivePrice =
    Number(searchParams.get("minPrice") || 0) > 0 ||
    Number(searchParams.get("maxPrice") || MAX_PRICE) < MAX_PRICE;
  const minPercent = (priceMin / MAX_PRICE) * 100;
  const maxPercent = (priceMax / MAX_PRICE) * 100;

  const handleFilterChange = async (type, value) => {
    if (type === "business") {
      const nextBusinessType = businessType === value ? "" : value;
      setBusinessType(nextBusinessType);
      setIsFiltering(true);
      pushSearchParams({ businessType: nextBusinessType });
      debouncedFilterChange({
        businessType: nextBusinessType || null,
        sort,
        minPrice: getCurrentMinPrice(),
        maxPrice: getCurrentMaxPrice(),
      });
      return;
    }

    if (type === "price") {
      const min = clampPrice(value?.min);
      const max = clampPrice(value?.max);
      const normalizedMin = Math.min(min, max);
      const normalizedMax = Math.max(min, max);

      setPriceMin(normalizedMin);
      setPriceMax(normalizedMax);
      setIsFiltering(true);

      const minParam = normalizedMin <= 0 ? null : normalizedMin;
      const maxParam = normalizedMax >= MAX_PRICE ? null : normalizedMax;

      pushSearchParams({
        minPrice: minParam,
        maxPrice: maxParam,
      });

      debouncedFilterChange({
        businessType: businessType || null,
        sort,
        minPrice: minParam,
        maxPrice: maxParam,
      });
      return;
    }

    if (type === "sort") {
      const nextSort = value || "newest";
      setSort(nextSort);
      setIsFiltering(true);
      pushSearchParams({ sort: nextSort });
      debouncedFilterChange({
        businessType: businessType || null,
        sort: nextSort,
        minPrice: getCurrentMinPrice(),
        maxPrice: getCurrentMaxPrice(),
      });
    }
  };

  const applyCurrentPriceRange = () => {
    handleFilterChange("price", { min: priceMin, max: priceMax });
  };

  const clearAllFilters = () => {
    setBusinessType("");
    setPriceMin(0);
    setPriceMax(MAX_PRICE);
    setShowBusinessModal(false);
    setShowPriceModal(false);
    setSort("newest");
    setShowSortModal(false);
    setIsFiltering(true);
    pushSearchParams({
      businessType: null,
      sort: null,
      minPrice: null,
      maxPrice: null,
    });
    debouncedFilterChange({
      businessType: null,
      sort: null,
      minPrice: null,
      maxPrice: null,
    });
  };

  return (
    <div className="rounded-lg mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2">
            <div ref={businessModalRef} className="relative">
              <button
                className={`px-3 py-1.5 text-sm rounded-full transition-all flex items-center gap-1 bg-gray-50 border border-gray-200 text-gray-700 hover:border-gray-500 ${
                  isFiltering ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => setShowBusinessModal((prev) => !prev)}
                disabled={isFiltering}
              >
                <span>
                  {businessType
                    ? `Business Type : ${
                        businessTypeOptions.find(
                          (option) => option.value === businessType,
                        )?.label || ""
                      }`
                    : "Business Type"}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform ${
                    showBusinessModal ? "rotate-180" : ""
                  }`}
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

              {showBusinessModal && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden">
                  {businessTypeOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`block w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${
                        businessType === option.value
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-700"
                      }`}
                      onClick={() => {
                        handleFilterChange("business", option.value);
                        setShowBusinessModal(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div ref={priceModalRef} className="relative">
              <button
                className={`px-3 py-1.5 text-sm rounded-full transition-all flex items-center gap-1 bg-gray-50 border border-gray-200 text-gray-700 hover:border-gray-500 ${
                  isFiltering ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => setShowPriceModal((prev) => !prev)}
                disabled={isFiltering}
              >
                <span>
                  {hasActivePrice
                    ? `Price : ${formatPrice(priceMin)} - ${formatPrice(priceMax)}`
                    : "Price"}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform ${
                    showPriceModal ? "rotate-180" : ""
                  }`}
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

              {showPriceModal && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-50 p-4">
                  <p className="text-xs text-gray-500 mb-3">
                    Select price range
                  </p>

                  <div className="mb-5">
                    <div className="relative h-8 flex items-center dual-range">
                      <div className="absolute left-0 right-0 h-2 bg-gray-200 rounded-full" />
                      <div
                        className="absolute h-2 bg-blue-600 rounded-full"
                        style={{
                          left: `${minPercent}%`,
                          width: `${Math.max(maxPercent - minPercent, 0)}%`,
                        }}
                      />
                      <input
                        type="range"
                        min={0}
                        max={MAX_PRICE}
                        step={10000}
                        value={priceMin}
                        onChange={(e) =>
                          setPriceMin(
                            Math.min(Number(e.target.value), priceMax),
                          )
                        }
                        onMouseUp={applyCurrentPriceRange}
                        onTouchEnd={applyCurrentPriceRange}
                        onKeyUp={applyCurrentPriceRange}
                        className="dual-thumb"
                      />
                      <input
                        type="range"
                        min={0}
                        max={MAX_PRICE}
                        step={10000}
                        value={priceMax}
                        onChange={(e) =>
                          setPriceMax(
                            Math.max(Number(e.target.value), priceMin),
                          )
                        }
                        onMouseUp={applyCurrentPriceRange}
                        onTouchEnd={applyCurrentPriceRange}
                        onKeyUp={applyCurrentPriceRange}
                        className="dual-thumb"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs ">
                    <span className="text-gray-700">
                      {formatPrice(priceMin)}
                    </span>
                    <button
                      className="text-blue-600 hover:text-blue-700 font-medium"
                      onClick={() => {
                        setPriceMin(0);
                        setPriceMax(MAX_PRICE);
                        handleFilterChange("price", { min: 0, max: MAX_PRICE });
                      }}
                    >
                      Reset
                    </button>
                    <span className="text-gray-700">
                      {formatPrice(priceMax)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {hasActiveFilters && (
              <button
                className={`px-3 py-1.5 text-sm transition-all underline underline-offset-2 ${
                  isFiltering
                    ? "opacity-50 cursor-not-allowed"
                    : "text-red-600 hover:text-red-700"
                }`}
                onClick={clearAllFilters}
                disabled={isFiltering}
              >
                ✕ Clear All
              </button>
            )}
          </div>
        </div>
        <div ref={sortModalRef} className="relative">
          <button
            className={`px-3 py-1.5 text-sm rounded-full transition-all flex items-center gap-1 bg-gray-50 border border-gray-200 text-gray-700 hover:border-gray-500 ${
              isFiltering ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => setShowSortModal((prev) => !prev)}
            disabled={isFiltering}
          >
            <span>
              {sortOptions.find((option) => option.value === sort)?.label || "Newest"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform ${showSortModal ? "rotate-180" : ""}`}
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

          {showSortModal && (
            <div className="absolute top-full right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  className={`block w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${
                    sort === option.value
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700"
                  }`}
                  onClick={() => {
                    handleFilterChange("sort", option.value);
                    setShowSortModal(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .dual-range .dual-thumb {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          height: 24px;
          margin: 0;
          background: transparent;
          pointer-events: none;
          -webkit-appearance: none;
          appearance: none;
        }

        .dual-range .dual-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: #2563eb;
          border: 2px solid #ffffff;
          box-shadow: 0 0 0 1px #2563eb;
          cursor: pointer;
          pointer-events: auto;
        }

        .dual-range .dual-thumb::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: #2563eb;
          border: 2px solid #ffffff;
          box-shadow: 0 0 0 1px #2563eb;
          cursor: pointer;
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
};

export default Filter;
