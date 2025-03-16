"use client";
import { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import citiesData from "@/data/gta-cities.json";
import { notFound, useSearchParams } from "next/navigation";
import ResaleCard from "@/components/ResaleCard";
import Filter from "@/components/Filter";
import LoadingBar from "@/components/LoadingBar";
import { getOfficeListings } from "@/api/getBusinessListings";
import { useWidePage } from "@/hooks/useWidePage";
import Image from "next/image";
import Link from "next/link";
import { cities } from "@/constant/cities";
import Pagination from "@/components/Pagination";

const { cities: gtaCities } = citiesData;

export default function CityOffices({ params }) {
  const [filteredListings, setFilteredListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWidePage] = useWidePage();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const [activePriceRange, setActivePriceRange] = useState(null);

  const searchParams = useSearchParams();
  const propertyTypeSlug = searchParams.get("type");

  const { city } = params;

  if (!city) {
    notFound();
  }

  const cityExists = gtaCities.find(
    (c) => c.toLowerCase() === city.toLowerCase()
  );
  const cityUrl = city.toLowerCase();

  if (!cityExists) {
    notFound();
  }

  const breadcrumbItems = [
    {
      label: cityExists,
      href: `/${cityUrl}`,
    },
    {
      label: selectedPropertyType || "Retail Lease",
    },
  ];

  // Function to convert slug back to display name
  const getDisplayNameFromSlug = (slug) => {
    if (!slug) return null;

    const displayMap = {
      "medical-dental": "Medical/Dental",
      "professional-office": "Professional Office",
      industrial: "Industrial",
      warehouse: "Warehouse",
      retail: "Retail",
    };

    return displayMap[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
  };

  // Get the display name for the property type
  const propertyType = getDisplayNameFromSlug(propertyTypeSlug);

  // Fetch initial data when component mounts
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const listings = await getOfficeListings({
          city: city,
        });

        // If there's a property type in the URL, filter by it
        if (propertyType && propertyType !== "All Properties") {
          setSelectedPropertyType(propertyType);
          const filtered = listings.filter((listing) => {
            return (
              listing.BusinessType &&
              listing.BusinessType.includes(propertyType)
            );
          });
          setFilteredListings(filtered);
        } else {
          setFilteredListings(listings);
        }
      } catch (error) {
        console.error("Error fetching initial listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [city, propertyType]);

  const handleFilterChange = async (filters) => {
    setIsLoading(true);
    setCurrentPage(1);
    try {
      // Get all listings first
      const listings = await getOfficeListings({
        city: city,
        priceRange: filters.priceRange,
      });

      // Update the selected property type state
      setSelectedPropertyType(filters.propertyType);
      // Update the price range state
      setActivePriceRange(filters.priceRange);

      // Apply property type filter if selected
      let filtered = listings;
      if (filters.propertyType) {
        filtered = listings.filter((listing) => {
          return (
            listing.BusinessType &&
            listing.BusinessType.includes(filters.propertyType)
          );
        });
      }

      setFilteredListings(filtered);
    } catch (error) {
      console.error("Error fetching filtered listings:", error);
      setFilteredListings([]);
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
    <>
      {isLoading && <LoadingBar />}
      <div className={`${isWidePage ? "sm:mx-20" : "max-w-7xl mx-auto"}`}>
        {/* <Breadcrumb items={breadcrumbItems} /> */}

        <h1 className="text-3xl font-bold text-gray-900">
          {selectedPropertyType
            ? `${selectedPropertyType} Properties`
            : "Commercial Properties for Lease"}{" "}
          in {cityExists}
        </h1>
        <p className="text-sm mb-4">
          {filteredListings.length}+ {cityExists} properties for lease.
          {selectedPropertyType ? ` Filtered by ${selectedPropertyType}.` : ""}
          Prices from $1 to $5,000,000. Open houses available.
        </p>
        <Filter onFilterChange={handleFilterChange} cityUrl={cityUrl} />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {currentItems.map((listing) => (
            <ResaleCard curElem={listing} key={listing.ListingKey} />
          ))}
        </div>

        {filteredListings.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            {selectedPropertyType
              ? `No ${selectedPropertyType} properties found in this area${
                  activePriceRange ? " and price range" : ""
                }.`
              : "No listings found in this price range."}
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
      </div>
    </>
  );
}
