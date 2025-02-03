"use client";
import { useState, use, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import citiesData from "@/data/gta-cities.json";
import { notFound } from "next/navigation";
import ResaleCard from "@/components/ResaleCard";
import Filter from "@/components/Filter";
import LoadingBar from "@/components/LoadingBar";
import { getOfficeListings } from "@/api/getBusinessListings";
import { useWidePage } from "@/hooks/useWidePage";

const { cities } = citiesData;

export default function CityOffices({ params }) {
  const [filteredListings, setFilteredListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWidePage] = useWidePage();
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const { city } = unwrappedParams;

  if (!city) {
    notFound();
  }

  const cityExists = cities.find((c) => c.toLowerCase() === city.toLowerCase());
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
      label: "Offices for Lease",
    },
  ];

  // Fetch initial data when component mounts
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const listings = await getOfficeListings({
          city: city,
        });
        setFilteredListings(listings);
      } catch (error) {
        console.error("Error fetching initial listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [city]);

  const handleFilterChange = async (filters) => {
    setIsLoading(true);
    try {
      const listings = await getOfficeListings({
        city: city,
        priceRange: filters.priceRange,
      });
      setFilteredListings(listings);
    } catch (error) {
      console.error("Error fetching filtered listings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingBar />}
      <div className={`${isWidePage ? "sm:mx-20" : "max-w-7xl mx-auto"}`}>
        {/* <Breadcrumb items={breadcrumbItems} /> */}

        <h1 className="text-3xl font-bold text-gray-900">
          Offices for Lease in {cityExists}
        </h1>
        <p className="text-sm mb-4">
          500+ {cityExists} businesses for sale. Book a showing for offices.
          Prices from $1 to $5,000,000. Open houses available.
        </p>
        <Filter onFilterChange={handleFilterChange} cityUrl={cityUrl} />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {filteredListings.map((listing) => (
            <ResaleCard curElem={listing} key={listing.ListingKey} />
          ))}
        </div>
      </div>
    </>
  );
}
