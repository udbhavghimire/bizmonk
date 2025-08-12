"use client";
import { useState } from "react";
import Filter from "@/components/Filter";
import ResaleCard from "@/components/ResaleCard";
import LoadingBar from "@/components/LoadingBar";
import { useWidePage } from "@/hooks/useWidePage";
import Pagination from "@/components/Pagination";

// Add this constant at the top of the file
const ITEMS_PER_PAGE = 12; // or whatever number you want to show per page

// Helper function to convert city names to URL-friendly format
const toUrlFormat = (cityName) => cityName.toLowerCase().replace(/\s+/g, "-");

export default function ClientPage({ initialData, cityName }) {
  const [listings, setListings] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    businessType: "",
    priceRange: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isWidePage] = useWidePage();

  // Filter and paginate the listings
  const getFilteredListings = () => {
    let filteredListings = [...listings];

    // Apply business type filter if selected
    if (filters.businessType) {
      filteredListings = filteredListings?.filter((listing) =>
        listing.BusinessType.includes(filters.businessType)
      );
    }

    // Apply price range filter if selected
    if (filters.priceRange) {
      filteredListings = filteredListings?.filter((listing) => {
        const price = Number(listing.ListPrice);
        return (
          price >= filters.priceRange.min && price <= filters.priceRange.max
        );
      });
    }

    return filteredListings;
  };

  const filteredListings = getFilteredListings();
  const totalListings = filteredListings?.length;
  const totalPages = Math.ceil(totalListings / ITEMS_PER_PAGE);

  // Get current page listings
  const getCurrentPageListings = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredListings?.slice(startIndex, endIndex);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentListings = getCurrentPageListings();

  return (
    <>
      {isLoading && <LoadingBar />}
      <div className={`${isWidePage ? "sm:mx-20" : "max-w-5xl mx-auto"}`}>
        <h1 className="md:text-4xl text-3xl font-bold text-gray-900">
          {totalListings}+ Business Opportunities in {cityName}
        </h1>
        <p className="md:text-sm text-[13px] mb-4">
          {totalListings}+ {cityName} businesses for sale. Book a showing for
          gas stations, restaurants, motels, convenience stores and lands.
          Prices from $1 to $5,000,000. Open houses available.
        </p>
        <Filter
          onFilterChange={handleFilterChange}
          cityUrl={toUrlFormat(cityName)}
        />

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {currentListings.map((data) => (
            <ResaleCard key={data.ListingKey} curElem={data} />
          ))}
        </div>

        {currentListings.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            No listings found matching your criteria
          </div>
        )}

        {totalPages > 1 && !isLoading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
}
