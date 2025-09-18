"use client";
import React from "react";
import Filter from "@/components/Filter";
import LoadingBar from "@/components/LoadingBar";
import { notFound, useParams } from "next/navigation";
import { useWidePage } from "@/hooks/useWidePage";
import Image from "next/image";
import Link from "next/link";
import { cities } from "@/constant/cities";
import Pagination from "@/components/Pagination";
import { useState, useEffect } from "react";
import { getConvenienceStoreListings } from "@/api/getBusinessListings";
import Breadcrumb from "@/components/Breadcrumb";
import ResaleCard from "@/components/ResaleCard";
import citiesData from "@/data/gta-cities.json";
const ListingListPage = ({ getListings, city, title, subtitle }) => {
  const [filteredListings, setFilteredListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWidePage] = useWidePage();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  if (!city) {
    notFound();
  }
  const cityUrl = city.toLowerCase();
  //
  // const breadcrumbItems = [
  //   {
  //     label: cityExists,
  //     href: `/${cityUrl}`,
  //   },
  //   {
  //     label: "Convenience Stores for Sale",
  //   },
  // ];

  // Fetch initial data when component mounts
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const listings = await getListings({
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
    setCurrentPage(1); // Reset to first page when filter changes
    try {
      const listings = await getListings({
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

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredListings?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredListings?.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isLoading && <LoadingBar />}
      <div className={`${isWidePage ? "sm:mx-20" : "max-w-5xl mx-auto"}`}>
        {/* <Breadcrumb items={breadcrumbItems} /> */}

        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm mb-4">{subtitle}</p>
        <Filter onFilterChange={handleFilterChange} cityUrl={cityUrl} />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {currentItems.map((listing) => (
            <ResaleCard curElem={listing} key={listing.ListingKey} />
          ))}
        </div>

        {filteredListings?.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            No listings found in this price range
          </div>
        )}

        {filteredListings?.length > 0 && (
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
};

export default ListingListPage;
