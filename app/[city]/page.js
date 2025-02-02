"use client";
import { useState, useEffect, use } from "react";
import citiesData from "@/data/gta-cities.json";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Filter from "@/components/Filter";
import { getSaleOfBusinessListings } from "@/api/getBusinessListings";
import ResaleCard from "@/components/ResaleCard";
import LoadingBar from "@/components/LoadingBar";
import { useWidePage } from "@/hooks/useWidePage";
import { businessTypes } from "@/constant/businessTypes";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";

const cities = citiesData.cities;

// Helper function to convert city names to URL-friendly format
const toUrlFormat = (cityName) => cityName.toLowerCase().replace(/\s+/g, "-");

// Helper function to find city by URL format
const findCityByUrlFormat = (urlFormat) => {
  return cities.find((city) => toUrlFormat(city) === urlFormat.toLowerCase());
};

export default function CityPage({ params }) {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    businessType: "",
    priceRange: "",
  });
  const [isWidePage] = useWidePage();

  // Get city from params
  const { city } = params;

  if (!city) {
    notFound();
  }

  const cityExists = findCityByUrlFormat(city);

  if (!cityExists) {
    notFound();
  }

  const cityName = cityExists;
  const cityUrl = toUrlFormat(cityName);

  const breadcrumbItems = [
    {
      label: cityName,
    },
  ];

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      try {
        const response = await getSaleOfBusinessListings(cityName);
        if (response && response.value) {
          let filteredListings = response.value;

          // Apply business type filter if selected
          if (filters.businessType) {
            filteredListings = filteredListings.filter((listing) =>
              listing.BusinessType.includes(filters.businessType)
            );
          }

          // Apply price range filter if selected
          if (filters.priceRange) {
            filteredListings = filteredListings.filter((listing) => {
              const price = Number(listing.ListPrice);
              return (
                price >= filters.priceRange.min &&
                price <= filters.priceRange.max
              );
            });
          }

          setListings(filteredListings);
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
        setListings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [cityName, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      {isLoading && <LoadingBar />}
      <div className={`${isWidePage ? "sm:mx-20" : "max-w-7xl mx-auto"}`}>
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-4xl font-bold text-gray-900">
          100+ Business Opportunities in {cityName}
        </h1>
        <p className="text-sm mb-4">
          500+ {cityName} businesses for sale. Book a showing for gas stations,
          restaurants, motels, convenience stores and lands. Prices from $1 to
          $5,000,000. Open houses available.
        </p>
        <Filter onFilterChange={handleFilterChange} cityUrl={cityUrl} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
          {listings.map((data) => (
            <ResaleCard key={data.ListingKey} curElem={data} />
          ))}
        </div>

        {listings.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            No listings found matching your criteria
          </div>
        )}
      </div>
    </>
  );
}
