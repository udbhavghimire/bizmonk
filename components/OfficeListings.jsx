"use client";
import { useState } from "react";
import ResaleCard from "@/components/ResaleCard";
import Pagination from "@/components/Pagination";

export default function OfficeListings({ initialData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = initialData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(initialData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {currentItems.map((listing) => (
          <ResaleCard curElem={listing} key={listing.ListingKey} />
        ))}
      </div>

      {initialData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No listings found
        </div>
      )}

      {initialData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
