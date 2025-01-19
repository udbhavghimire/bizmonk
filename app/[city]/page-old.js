"use client";
import { useState, useEffect, use } from "react";
import citiesData from "@/data/gta-cities.json";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Filter from "@/components/Filter";
import {
  getConvenienceStoreListings,
  getOfficeListings,
  getRestaurantListings,
} from "@/api/getBusinessListings";
import ResaleCard from "@/components/ResaleCard";
import LoadingBar from "@/components/LoadingBar";

const cities = citiesData.cities;

// Helper function to convert city names to URL-friendly format
const toUrlFormat = (cityName) => cityName.toLowerCase().replace(/\s+/g, "-");

// Helper function to find city by URL format
const findCityByUrlFormat = (urlFormat) => {
  return cities.find((city) => toUrlFormat(city) === urlFormat.toLowerCase());
};

export default function CityPage({ params }) {
  const [filteredListings, setFilteredListings] = useState({
    restaurants: [],
    convenienceStores: [],
    offices: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    businessType: "",
    priceRange: "",
  });

  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const { city } = unwrappedParams;

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
        const [restaurants, convenienceStores, offices] = await Promise.all([
          getRestaurantListings({
            city: cityName,
            numberOfListings: filters.businessType === "restaurant" ? null : 4,
            priceRange: filters.priceRange,
          }),
          getConvenienceStoreListings({
            city: cityName,
            numberOfListings:
              filters.businessType === "convenience-store" ? null : 4,
            priceRange: filters.priceRange,
          }),
          getOfficeListings({
            city: cityName,
            numberOfListings: filters.businessType === "office" ? null : 4,
            priceRange: filters.priceRange,
          }),
        ]);

        setFilteredListings({
          restaurants: restaurants,
          convenienceStores: convenienceStores,
          offices: offices,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [cityName, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const renderListings = () => {
    if (filters.businessType === "restaurant") {
      return (
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Restaurants for Sale
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredListings.restaurants.map((data, index) => (
              <ResaleCard key={data._id || index} curElem={data} />
            ))}
          </div>
        </div>
      );
    }

    if (filters.businessType === "convenience-store") {
      return (
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Convenience Stores for Sale
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredListings.convenienceStores.map((data, index) => (
              <ResaleCard key={data._id || index} curElem={data} />
            ))}
          </div>
        </div>
      );
    }

    if (filters.businessType === "office") {
      return (
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Offices for Lease
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredListings.offices.map((data, index) => (
              <ResaleCard key={data._id || index} curElem={data} />
            ))}
          </div>
        </div>
      );
    }

    return (
      <>
        {/* Restaurant Section */}
        <div className="py-8">
          <div className="flex justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Restaurants for Sale
            </h2>
            <Link
              href={`/${cityUrl}/restaurant-for-sale`}
              className="bg-black text-white rounded-md px-4 py-2 hover:scale-105"
            >
              View More
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredListings.restaurants.map((data, index) => (
              <ResaleCard key={data._id || index} curElem={data} />
            ))}
          </div>
        </div>

        {/* Convenience Store Section */}
        <div className="py-8">
          <div className="flex justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Convenience Stores for Sale
            </h2>
            <Link
              href={`/${cityUrl}/convenience-store-for-sale`}
              className="bg-black text-white rounded-md px-4 py-2 hover:scale-105"
            >
              View More
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredListings.convenienceStores.map((data, index) => (
              <ResaleCard key={data._id || index} curElem={data} />
            ))}
          </div>
        </div>

        {/* Office Section */}
        <div className="py-8">
          <div className="flex justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Offices for Lease
            </h2>
            <Link
              href={`/${cityUrl}/offices-for-lease`}
              className="bg-black text-white rounded-md px-4 py-2 hover:scale-105"
            >
              View More
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredListings.offices.map((data, index) => (
              <ResaleCard key={data._id || index} curElem={data} />
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {isLoading && <LoadingBar />}
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          100+Business Opportunities in {cityName}
        </h1>

        <Filter onFilterChange={handleFilterChange} cityUrl={cityUrl} />

        <div className="flex flex-col">{renderListings()}</div>
      </div>
    </div>
  );
}
