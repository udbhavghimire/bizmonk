"use client";
import { useState, useEffect, Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { cities } from "@/constant/cities";
import ResaleCard from "@/components/ResaleCard";
import { getOfficeListings } from "@/api/getBusinessListings";
import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import { businessDescriptions } from "@/data/business-descriptions";

function RetailLeaseContent() {
  const searchParams = useSearchParams();
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredListings, setFilteredListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // Get the property type from URL
  const typeParam = searchParams?.get("type");

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    // Only apply URL parameter filtering after initial data load
    if (listings.length > 0 && initialLoadComplete && typeParam) {
      filterListingsByParams();
    }
  }, [typeParam, listings, initialLoadComplete]);

  const fetchListings = async () => {
    setIsLoading(true);
    try {
      // Pass an empty object since the function expects an object parameter
      const data = await getOfficeListings({});
      setListings(data);
      setFilteredListings(data);

      // After initial load, apply URL filters if any
      setInitialLoadComplete(true);
      if (typeParam) {
        setTimeout(() => filterListingsByParams(), 0);
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterListingsByParams = () => {
    if (!listings || listings.length === 0 || !typeParam) return;

    setIsLoading(true);
    try {
      let filtered = [...listings];

      // Apply property type filter if present in URL
      let propertyType;

      // Map URL parameter back to actual property type
      if (typeParam === "retail-store-related") {
        propertyType = "Retail Store Related";
      } else if (typeParam === "medical-dental") {
        propertyType = "Medical/Dental";
      } else if (typeParam === "professional-office") {
        propertyType = "Professional Office";
      } else {
        propertyType = typeParam.charAt(0).toUpperCase() + typeParam.slice(1);
      }

      filtered = filtered.filter((listing) =>
        listing.BusinessType?.includes(propertyType)
      );

      setFilteredListings(filtered);
    } catch (error) {
      console.error("Error applying filters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = async (filters) => {
    if (!listings || listings.length === 0) return;

    setIsLoading(true);
    setCurrentPage(1); // Reset to first page when filter changes
    try {
      let filtered = [...listings];

      // Apply property type filter if provided
      if (filters.propertyType) {
        filtered = filtered.filter((listing) =>
          listing.BusinessType?.includes(filters.propertyType)
        );
      }

      setFilteredListings(filtered);
    } catch (error) {
      console.error("Error applying filters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredListings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Commercial Space for Lease in Ontario
        </h1>

        <Filter
          onFilterChange={handleFilterChange}
          isLoading={isLoading}
          cityUrl=""
          hidePriceRange={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {currentItems.map((listing) => (
            <ResaleCard curElem={listing} key={listing.ListingKey} />
          ))}
        </div>

        {filteredListings.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            No listings found
          </div>
        )}

        {filteredListings.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {/* Cities Section */}
        <div className="py-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Business Properties for sale in your city
            </h2>
            <p className="text-lg text-gray-600">
              Explore top cities across Canada
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities?.map((city) => (
              <Link
                key={city.name}
                href={`/${city.name.toLowerCase()}`}
                className="group relative rounded-lg overflow-hidden aspect-[4/3]"
              >
                <Image
                  src={city.image}
                  alt={`${city.name} cityscape`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                  {city.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">
            Commercial Space for Lease
          </h2>
          {businessDescriptions.commercial &&
            businessDescriptions.commercial.paragraphs.map(
              (paragraph, index) => (
                <p
                  key={index}
                  className="mb-4 text-gray-700 whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              )
            )}
          {!businessDescriptions.commercial && (
            <p className="mb-4 text-gray-700">
              Looking for commercial space to lease in Ontario? Browse our
              comprehensive listings of commercial properties available for
              lease across Ontario. Our platform offers a wide range of spaces
              suitable for various business needs, including retail storefronts,
              professional offices, industrial spaces, medical/dental
              facilities, and warehouses. Each listing provides detailed
              information about the property, including square footage, location
              details, lease terms, and more to help you find the perfect space
              for your business.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RetailLease() {
  return (
    <Suspense>
      <RetailLeaseContent />
    </Suspense>
  );
}
