"use client";
import { useState, useEffect } from "react";
import { getConvenienceStoreListings } from "@/api/getBusinessListings";
import Breadcrumb from "@/components/Breadcrumb";
import ResaleCard from "@/components/ResaleCard";
import Filter from "@/components/Filter";

export default function ConvenienceStores() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setIsLoading(true);
    try {
      const data = await getConvenienceStoreListings();
      setListings(data);
      setFilteredListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = async (filters) => {
    setIsLoading(true);
    try {
      let filtered = [...listings];

      if (filters.priceRange) {
        filtered = filtered.filter((listing) => {
          const price = Number(listing.ListPrice);
          return (
            price >= filters.priceRange.min && price <= filters.priceRange.max
          );
        });
      }

      setFilteredListings(filtered);
    } catch (error) {
      console.error("Error applying filters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={[{ label: "Convenience Stores for Sale" }]} />

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Convenience Stores for Sale in Ontario
        </h1>

        <Filter onFilterChange={handleFilterChange} isLoading={isLoading} />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredListings.map((listing) => (
            <ResaleCard curElem={listing} key={listing.ListingKey} />
          ))}
        </div>

        {filteredListings.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            No listings found in this price range
          </div>
        )}
      </div>
    </div>
  );
}
