"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";

import TimeAgo from "@/components/TimeAgo";
import StickyContactForm from "./StickyContactForm";
//CUSTOM HOOKS
import useDeviceView from "@/helpers/useDeviceView";

//CONSTANT
import Collapse from "@/components/Collapse";
import Image from "next/image";
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

const PropertyPage = ({ main_data, financialInfo }) => {
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
    const element = document.getElementById("contact");
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

  const priceDecreased = useMemo(() => {
    if (
      parseFloat(main_data.MinListPrice) === parseFloat(main_data.ListPrice) &&
      parseFloat(main_data.ListPrice) < parseFloat(main_data.MaxListPrice)
    ) {
      return true;
    }
    return false;
  }, [main_data.MaxListPrice, main_data.ListPrice, main_data.MinListPrice]);

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
      <div className="screenshot col-12 mt-10">
        <div
          className={`border-0  rounded-md ${
            isMobileView ? "sm:p-4 pt-3 mt-3" : "mt-5"
          }`}
        >
          <div
            className={`flex flex-col flex-wrap${
              isMobileView ? "gap-3" : "gap-0"
            }`}
          >
            <div className="flex flex-col space-y-2">
              <div className="space-x-2 block sm:hidden">
                <button className="bg-[#CC0B0B] p-1 text-white text-xs font-bold mt-1 sm:my-0 w-fit-content rounded-md">
                  <TimeAgo modificationTimestamp={main_data.TimestampSql} />
                </button>
                <button className="bg-[#CC0B0B] p-1 text-white text-xs font-bold mt-1 sm:my-0 w-fit-content rounded-md">
                  <span>{main_data.TypeOwn1Out}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-0 rounded-md">
          <section className="flex flex-col sm:flex-row justify-between">
            <div className="">
              <h3 className="text-2xl font-bold">Price: {price}</h3>
              <h1 className="fs-6 mt-0 mb-1 text-lg">
                {main_data.UnparsedAddress}
              </h1>
            </div>
            {/* <div className="">
              <Link
                href="#bookdate"
                className="bg-black rounded-md text-white h-10 px-4 text-md flex items-center hover:scale-110 transform max-w-fit my-3 sm:my-0 sm:w-auto"
                scroll={false}
                onClick={() => {
                  const element = document.getElementById("bookdate");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <HeadphonesIcon className="h-5 w-5 mr-2" />
                Contact the seller
              </Link>
            </div> */}
          </section>
          <p
            className={`text-lg pty-description pt-2 sm:leading-8 ${
              showMoreDesc ? "" : "line-clamp-4 sm:line-clamp-6"
            }`}
            ref={contentRef}
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {main_data.PublicRemarks}
          </p>
          {isOverflowing && (
            <button
              className="mt-2 px-2 border-2 border-black py-[3px] text-white font-semibold rounded-lg bg-black hover:text-black hover:bg-gray-200 focus:outline-none transition-colors duration-200 sm:my-2 mb-4 underline"
              onClick={toggleShowMore}
            >
              {showMoreDesc ? "See Less" : "See More"}
            </button>
          )}
        </div>

        {/* Extras */}
        {main_data?.Extras && (
          <div className={`${isMobileView ? "pt-4 pb-4" : "pt-4 pb-4"}`}>
            <div className="col-md-12 px-0">
              <div className="container rounded-md border-0">
                <h2 className="font-bold text-xl sm:text-xl">Extras</h2>
                <div className="flex flex-grid text-lg py-1 leading-8">
                  {main_data.PublicRemarksExtras}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <hr className=" py-10" />
      <h1 className="text-2xl font-bold mb-6">Property Overview</h1>
      <PropertyDataTable main_data={main_data} />

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center justify-between">
          Similar Listings for Sale
          <Link
            href={`/${main_data.City.toLowerCase()}`}
            className="text-base font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            View all listings
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </h2>

        {isLoadingSimilar ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse"
              >
                <div className="aspect-[4/3] bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
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
          <div className="text-center py-8 text-gray-500">
            No similar listings found
          </div>
        )}

        {/* Mobile view - Show more button */}
        {similarListings.length > 0 && (
          <div className="mt-6 text-center md:hidden">
            <Link
              href={`/${main_data.City.toLowerCase()}`}
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Show more listings
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
        )}
      </div>

      <div
        className={`${isMobileView ? "pt-4 pb-4 mt-12" : "mt-12 pt-4 pb-4"}`}
      >
        {main_data.ListBrokerage && (
          <div className="flex flex-grid text-xs font-medium py-1 text-gray-700">
            Listed by {main_data?.ListBrokerage}
          </div>
        )}
      </div>
      {/* <div className={isMobileView ? `mt-12 col-12` : `mt-24 col-12`}>
        <CompactMortgageCalculator
          price={main_data?.ListPrice}
          showDetails={false}
          align="left"
        />
      </div> */}
      <div className={isMobileView ? `mt-14 col-12` : `mt-24 col-12`}>
        <h2 className="font-bold pb-3 text-lg sm:text-2xl pt-3 flex items-center">
          <FileTextIcon className="h-6 w-6 mr-2" />
          Financial Information
        </h2>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Gross Revenue */}
            <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-700 text-sm font-medium">
                  Gross Revenue
                </h3>
                <DollarSignIcon className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-xl sm:text-2xl font-bold mt-2 text-gray-900">
                {financialInfo?.grossRevenue ? (
                  <>
                    {formatCurrency(financialInfo.grossRevenue)}
                    {financialInfo.grossRevenueGrowth > 0 && (
                      <span className="text-sm text-green-600 ml-2">
                        +{financialInfo.grossRevenueGrowth}%
                      </span>
                    )}
                  </>
                ) : (
                  <button
                    onClick={handleScrollToContactAgent}
                    className="text-base text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    Contact for details →
                  </button>
                )}
              </p>
              <p className="text-sm text-gray-500 mt-1">Annual revenue</p>
            </div>

            {/* SDE */}
            <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-700 text-sm font-medium">
                  Seller's Discretionary Earnings
                </h3>
                <ChartBarIcon className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-xl sm:text-2xl font-bold mt-2 text-gray-900">
                {financialInfo?.sde ? (
                  <>
                    {formatCurrency(financialInfo.sde)}
                    {financialInfo.sdeMargin && (
                      <span className="text-sm text-gray-600 ml-2">
                        ({financialInfo.sdeMargin}% margin)
                      </span>
                    )}
                  </>
                ) : (
                  <button
                    onClick={handleScrollToContactAgent}
                    className="text-base text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    Contact for details →
                  </button>
                )}
              </p>
              <p className="text-sm text-gray-500 mt-1">Normalized earnings</p>
            </div>

            {/* EBITDA */}
            <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-700 text-sm font-medium">EBITDA</h3>
                <TrendingUpIcon className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-xl sm:text-2xl font-bold mt-2 text-gray-900">
                {financialInfo?.ebitda ? (
                  <>
                    {formatCurrency(financialInfo.ebitda)}
                    {financialInfo.ebitdaMultiple && (
                      <span className="text-sm text-gray-600 ml-2">
                        ({financialInfo.ebitdaMultiple}x multiple)
                      </span>
                    )}
                  </>
                ) : (
                  <button
                    onClick={handleScrollToContactAgent}
                    className="text-base text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    Contact for details →
                  </button>
                )}
              </p>
              <p className="text-sm text-gray-500 mt-1">Operating profit</p>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-blue-800">
                  Financial Verification
                </h4>
                <p className="mt-1 text-sm text-blue-600">
                  All financial information is subject to verification during
                  due diligence. Contact the seller for detailed financial
                  statements and documentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyPage;
