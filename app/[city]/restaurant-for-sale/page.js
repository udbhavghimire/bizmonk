"use client";
import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import citiesData from "@/data/gta-cities.json";
import ResaleCard from "@/components/ResaleCard";
import Filter from "@/components/Filter";
import LoadingBar from "@/components/LoadingBar";
import { getRestaurantListings } from "@/api/getBusinessListings";
import { useWidePage } from "@/hooks/useWidePage";
import Image from "next/image";
import Link from "next/link";
import { cities } from "@/constant/cities";
import Pagination from "@/components/Pagination";
import { businessDescriptions } from "@/data/business-descriptions";

const { cities: gtaCities } = citiesData;

export default function CityRestaurants() {
  const params = useParams();
  const city = params?.city;

  const [isWidePage] = useWidePage();

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
    { label: cityExists, href: `/${cityUrl}` },
    { label: "Restaurants for Sale" },
  ];

  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredListings, setFilteredListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setIsLoading(true);
    try {
      const listings = await getRestaurantListings({
        city: city,
      });
      setListings(listings);
      setFilteredListings(listings);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = async (filters) => {
    setIsLoading(true);
    try {
      const listings = await getRestaurantListings({
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
          Restaurants for Sale in {cityExists}
        </h1>
        <p className="text-sm mb-4">
          500+ {cityExists} businesses for sale. Book a showing for restaurants.
          Prices from $1 to $5,000,000. Open houses available.
        </p>
        <Filter onFilterChange={handleFilterChange} cityUrl={cityUrl} />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredListings?.map((listing) => (
            <ResaleCard curElem={listing} key={listing.ListingKey} />
          ))}
        </div>

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
