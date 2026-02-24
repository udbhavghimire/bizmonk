"use client";
import { useState, useTransition } from "react";
import Filter from "@/components/Filter";
import ResaleCard from "@/components/ResaleCard";
import { useRouter, useSearchParams } from "next/navigation";

export default function ClientPage({ listings, cityName, pagination }) {
  console.log(cityName);
  const { currentPage, totalPages, totalCount } = pagination;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const navigate = (url, options) =>
    startTransition(() => router.push(url, options));

  const goToPage = (page) => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    navigate(`/${cityName}?${params.toString()}`, { scroll: true });
  };

  return (
    <>
      <div className="sm:mx-20">
        <h1 className="md:text-4xl text-3xl font-bold text-gray-900">
          {totalCount}+ Business Opportunities in {cityName}
        </h1>
        <p className="md:text-sm text-[13px] mb-4">
          {totalCount}+ {cityName} businesses for sale. Book a showing for gas
          stations, restaurants, motels, convenience stores and lands. Prices
          from $1 to $5,000,000. Open houses available.
        </p>
        <Filter />

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {listings.map((data) => (
            <ResaleCard key={data.ListingKey} curElem={data} />
          ))}
        </div>

        {listings.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No listings found matching your criteria
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1 sm:gap-2 mt-12 mb-20 w-full px-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-2 py-2 sm:px-4 text-xs sm:text-sm border rounded transition-colors ${
                currentPage === 1
                  ? "pointer-events-none opacity-30"
                  : "hover:bg-gray-50"
              }`}
            >
              Prev
            </button>

            <div className="flex items-center gap-1 sm:gap-2">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                const isNeighbor = Math.abs(currentPage - pageNum) <= 1;

                if (pageNum === 1 || pageNum === totalPages || isNeighbor) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm flex items-center justify-center rounded border transition-colors ${
                        currentPage === pageNum
                          ? "bg-slate-800 text-white border-slate-800"
                          : "hover:bg-gray-50 text-slate-600"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }

                if (
                  pageNum === currentPage - 2 ||
                  pageNum === currentPage + 2
                ) {
                  return (
                    <span
                      key={pageNum}
                      className="text-gray-400 text-xs sm:text-sm px-1"
                    >
                      ...
                    </span>
                  );
                }

                return null;
              })}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-2 py-2 sm:px-4 text-xs sm:text-sm border rounded transition-colors ${
                currentPage === totalPages
                  ? "pointer-events-none opacity-30"
                  : "hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}
