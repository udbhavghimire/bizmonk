"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";

import TimeAgo from "@/components/TimeAgo";
import StickyContactForm from "./StickyContactForm";
//CUSTOM HOOKS
import useDeviceView from "@/helpers/useDeviceView";

//CONSTANT
import Collapse from "@/components/Collapse";

//ICONS

import { priceFormatter } from "@/helpers/priceFormatter";
import Link from "next/link";
import MortgageCalculator from "./MortgageCalculator";

// import CompactMortgageCalculator from "./CompactMortgageCalculator";
// import { houseType } from "@/constant";
import PropertyDataTable from "./PropertyDataTable";
import formatCurrency from "@/helpers/formatCurrency";
import {
  HeadphonesIcon,
  FileTextIcon,
  TrendingUpIcon,
  DollarSignIcon,
  ChartBarIcon,
  ArrowRightIcon,
} from "lucide-react";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import { houseType } from "@/constant/businessTypes";
import {
  getRestaurantListings,
  getConvenienceStoreListings,
} from "@/api/getBusinessListings";
import ResaleCard from "./ResaleCard";

const PropertyPage = ({ main_data, financialInfo, hideHeader = false }) => {
  const [navbar, setNavbar] = useState(false);

  const { isMobileView } = useDeviceView();
  const [showMoreDesc, setShowMoreDesc] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);
  const price = formatCurrency(main_data?.ListPrice);
  const toggleShowMore = () => {
    setShowMoreDesc(!showMoreDesc);
  };

  const handleScrollToContactAgent = () => {
    const element = document.getElementById("contactform");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Construct complete address for walkscore
  const walkscoreAddress = encodeURIComponent(
    `${main_data.StreetNumber} ${main_data.StreetName} ${
      main_data.StreetSuffix || ""
    }, ${main_data.City}, ${main_data.StateOrProvince}`
  );

  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", () => {
        if (window.scrollY >= 870) {
          setNavbar(true);
        } else {
          setNavbar(false);
        }
      });
    }
  }, []);

  const typeOwnSrchToName = {};
  if (houseType) {
    Object.values(houseType).forEach(
      (item) => (typeOwnSrchToName[item.value] = item.name)
    );
  }

  useEffect(() => {
    // Check if content is overflowing
    if (contentRef.current) {
      const element = contentRef.current;
      // Compare the scrollHeight with clientHeight to determine if the text overflows
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    }
  }, [main_data.RemarksForClients]);

  // Add state for similar listings
  const [similarListings, setSimilarListings] = useState([]);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(true);

  // Add useEffect to fetch similar listings
  useEffect(() => {
    const fetchSimilarListings = async () => {
      setIsLoadingSimilar(true);
      try {
        let listings = [];

        // Determine which type of listings to fetch based on BusinessType
        if (main_data.BusinessType?.includes("Restaurant")) {
          listings = await getRestaurantListings({
            city: main_data.City,
            numberOfListings: 6, // Fetch more listings to ensure we have enough after filtering
          });
        } else if (main_data.BusinessType?.includes("Convenience")) {
          listings = await getConvenienceStoreListings({
            city: main_data.City,
            numberOfListings: 6,
          });
        }

        // Filter out the current listing
        const filteredListings = listings.filter(
          (listing) => listing.ListingKey !== main_data.ListingKey
        );

        // Try to get listings within price range first
        const priceRangeListings = filteredListings?.filter((listing) => {
          const listingPrice = Number(listing.ListPrice);
          const currentPrice = Number(main_data.ListPrice);
          return (
            listingPrice >= currentPrice * 0.7 &&
            listingPrice <= currentPrice * 1.3
          );
        });

        // If we have enough listings in price range, use those
        // Otherwise, use any available listings of the same type
        const finalListings =
          priceRangeListings.length >= 3
            ? priceRangeListings.slice(0, 3)
            : filteredListings?.slice(0, 3);

        setSimilarListings(finalListings);
      } catch (error) {
        console.error("Error fetching similar listings:", error);
        setSimilarListings([]);
      } finally {
        setIsLoadingSimilar(false);
      }
    };

    if (main_data?.City && main_data?.BusinessType) {
      fetchSimilarListings();
    }
  }, [
    main_data.City,
    main_data.BusinessType,
    main_data.ListPrice,
    main_data.ListingKey,
  ]);

  return (
    <>
      <div className="space-y-8">
        {!hideHeader && (
          <div className={`border-0 rounded-md ${isMobileView ? "pt-2" : "mt-5"}`}>
             {/* Header logic removed as requested, keeping this block empty or conditional if needed later */}
             <div className="flex flex-col sm:flex-row justify-between mb-4">
                <div className="">
                  <h3 className="text-2xl font-bold">Price: {price}</h3>
                  <h1 className="fs-6 mt-0 mb-1 text-lg">
                    {main_data.UnparsedAddress}
                  </h1>
                </div>
             </div>
          </div>
        )}

        {/* Description Section */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-900 border-l-4 border-black pl-3 rounded-sm leading-6">About this Business</h2>
          <div
            className={`text-gray-600 leading-relaxed text-base pt-2 ${
              showMoreDesc ? "" : "line-clamp-4 sm:line-clamp-6"
            }`}
            ref={contentRef}
            style={{
               whiteSpace: 'pre-line' // Preserve line breaks if any
            }}
          >
            {main_data.PublicRemarks}
          </div>
          {isOverflowing && (
            <button
              className="mt-3 text-sm font-semibold text-black hover:text-gray-700 underline underline-offset-4 transition-colors p-0 bg-transparent border-0"
              onClick={toggleShowMore}
            >
              {showMoreDesc ? "Read Less" : "Read More"}
            </button>
          )}
        </div>

        {/* Extras / Highlights */}
        {main_data?.Extras && (
          <div>
             <h2 className="text-xl font-bold mb-4 text-gray-900 border-l-4 border-black pl-3 rounded-sm leading-6">Extras & Highlights</h2>
             <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 text-gray-700 leading-relaxed">
               {main_data.PublicRemarksExtras}
             </div>
          </div>
        )}
      </div>

      <hr className="border-gray-100 my-8" />
      
      {/* Property Details Table */}
      <div>
        <h2 className="text-xl font-bold mb-6 text-gray-900 border-l-4 border-black pl-3 rounded-sm leading-6">Property Details</h2>
        <PropertyDataTable main_data={main_data} />
      </div>

      <hr className="border-gray-100 my-8" />

      {/* Financial Information */}
      <div>
        <h2 className="text-xl font-bold mb-6 flex items-center text-gray-900 border-l-4 border-black pl-3 rounded-sm leading-6">
          <FileTextIcon className="h-5 w-5 mr-3 text-gray-700" />
          Financial Information
        </h2>

        <div className="rounded-2xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 bg-white">
            {/* Gross Revenue */}
            <div className="p-6 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                  Gross Revenue
                </h3>
                <div className="p-2 bg-green-50 rounded-lg">
                   <DollarSignIcon className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {financialInfo?.grossRevenue ? (
                  <>
                    {formatCurrency(financialInfo.grossRevenue)}
                    {financialInfo.grossRevenueGrowth > 0 && (
                      <span className="block text-xs font-medium text-green-600 mt-1">
                        +{financialInfo.grossRevenueGrowth}% Growth
                      </span>
                    )}
                  </>
                ) : (
                  <button
                    onClick={handleScrollToContactAgent}
                    className="text-base font-medium text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Contact for details
                  </button>
                )}
              </p>
            </div>

            {/* SDE */}
            <div className="p-6 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                  SDE
                </h3>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <ChartBarIcon className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {financialInfo?.sde ? (
                  <>
                    {formatCurrency(financialInfo.sde)}
                    {financialInfo.sdeMargin && (
                      <span className="block text-xs font-medium text-blue-600 mt-1">
                        {financialInfo.sdeMargin}% Margin
                      </span>
                    )}
                  </>
                ) : (
                  <button
                    onClick={handleScrollToContactAgent}
                     className="text-base font-medium text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Contact for details
                  </button>
                )}
              </p>
            </div>

            {/* EBITDA */}
            <div className="p-6 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                  EBITDA
                </h3>
                <div className="p-2 bg-purple-50 rounded-lg">
                  <TrendingUpIcon className="h-4 w-4 text-purple-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {financialInfo?.ebitda ? (
                  <>
                    {formatCurrency(financialInfo.ebitda)}
                    {financialInfo.ebitdaMultiple && (
                      <span className="block text-xs font-medium text-purple-600 mt-1">
                        {financialInfo.ebitdaMultiple}x Multiple
                      </span>
                    )}
                  </>
                ) : (
                  <button
                    onClick={handleScrollToContactAgent}
                     className="text-base font-medium text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Contact for details
                  </button>
                )}
              </p>
            </div>
          </div>
          
           <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-start gap-3">
               <div className="flex-shrink-0 mt-0.5">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
               </div>
               <p className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">Verification:</span> All financial information is subject to verification during due diligence. Contact the seller for detailed statements.
               </p>
           </div>
        </div>
      </div>

       <div className="mt-16">
        <h2 className="text-xl font-bold mb-6 flex items-center justify-between text-gray-900 border-l-4 border-black pl-3 rounded-sm leading-6">
          Similar Listings
          <Link
            href={`/${main_data.City.toLowerCase()}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 group"
          >
            View all
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </h2>

        {isLoadingSimilar ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 animate-pulse"
              >
                <div className="aspect-[4/3] bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : similarListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarListings.map((listing) => (
              <ResaleCard key={listing.ListingKey} curElem={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 rounded-xl bg-gray-50 border border-dashed border-gray-200 text-gray-500">
            No similar listings found at this moment.
          </div>
        )}

        {/* Mobile view - Show more button */}
        {similarListings.length > 0 && (
          <div className="mt-6 text-center md:hidden">
            <Link
              href={`/${main_data.City.toLowerCase()}`}
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors w-full"
            >
              Show all listings
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
        )}
      </div>

      <div className="mt-12 pt-6 border-t border-gray-100">
        {main_data.ListBrokerage && (
          <div className="text-xs text-gray-400 font-medium">
            Listed by {main_data?.ListBrokerage}
          </div>
        )}
      </div>
    </>
  );
};

export default PropertyPage;
