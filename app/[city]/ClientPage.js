"use client";
import { useEffect, useState, useTransition } from "react";
import Filter from "@/components/Filter";
import ResaleCard from "@/components/ResaleCard";
import { useRouter, useSearchParams } from "next/navigation";

export default function ClientPage({ listings, cityName, pagination, categorySlug }) {
  const { currentPage, totalPages, totalCount } = pagination;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [isFilterPending, setIsFilterPending] = useState(false);
  const [isPagePending, setIsPagePending] = useState(false);
  const showContentSkeleton = isFilterPending || isPagePending;
  const navigate = (url, options) =>
    startTransition(() => router.push(url, options));

  useEffect(() => {
    setIsFilterPending(false);
    setIsPagePending(false);
  }, [listings, currentPage, totalPages, totalCount]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setIsPagePending(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    navigate(`/${cityName}?${params.toString()}`, { scroll: true });
  };

  let displayCategory = "Business Opportunities";
  let displayCategoryLower = "businesses";
  
  if (categorySlug) {
    const formattedCategory = categorySlug.replace(/-for-sale$/i, '').replace(/-lease$/i, '').replace(/-/g, ' ');
    displayCategory = formattedCategory.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + " Businesses";
    displayCategoryLower = formattedCategory.toLowerCase() + " businesses";
  }

  return (
    <>
      <div className="sm:mx-20">
        <h1 className="md:text-4xl text-3xl font-bold text-gray-900">
          {totalCount}+ {displayCategory} in {cityName}
        </h1>
        <p className="md:text-sm text-[13px] mb-4 text-gray-600">
          {totalCount}+ {cityName} {displayCategoryLower} for sale. Book a showing for gas
          stations, restaurants, motels, convenience stores and lands. Prices
          from $1 to $5,000,000. Open houses available.
        </p>
        <Filter onPendingChange={setIsFilterPending} />

        {showContentSkeleton ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 animate-pulse">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-200 bg-white overflow-hidden"
                >
                  <div className="h-36 sm:h-40 bg-gray-200" />
                  <div className="p-3 space-y-2">
                    <div className="h-4 w-4/5 bg-gray-200 rounded" />
                    <div className="h-4 w-3/5 bg-gray-200 rounded" />
                    <div className="h-3 w-1/2 bg-gray-200 rounded" />
                    <div className="h-8 w-full bg-gray-200 rounded mt-2" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center gap-2 mt-12 mb-20 animate-pulse">
              <div className="h-9 w-16 bg-gray-200 rounded" />
              <div className="h-9 w-9 bg-gray-200 rounded" />
              <div className="h-9 w-9 bg-gray-200 rounded" />
              <div className="h-9 w-9 bg-gray-200 rounded" />
              <div className="h-9 w-16 bg-gray-200 rounded" />
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {listings.map((property) => (
                <ResaleCard key={property.ListingKey} curElem={property} />
              ))}
            </div>

            {listings.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No listings found matching your criteria
              </div>
            )}
          </>
        )}

        {!showContentSkeleton && totalPages > 1 && (
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
