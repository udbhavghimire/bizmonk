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
        let listings;
        listings = await getSaleOfBusinessListings({ city: cityName });
        // if (filters.businessType == "") {
        // }
        // else if(filters.businessType){

        // }
        console.log(filters);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
        {listings.map((data, index) => (
          <ResaleCard key={data._id || index} curElem={data} />
        ))}
      </div>
    );
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

        <div className="flex flex-col">{renderListings()}</div>
      </div>
    </>
  );
}
