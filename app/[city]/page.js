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
        const listings = await getSaleOfBusinessListings({ city: cityName });
        setListings(listings.value);
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
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {listings.map((data, index) => (
          <ResaleCard key={data._id || index} curElem={data} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
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
