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
import { HeadphonesIcon } from "lucide-react";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import { houseType } from "@/constant/businessTypes";

const PropertyPage = ({ main_data }) => {
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
    `${main_data.StreetNumber} ${main_data.StreetName} ${main_data.StreetSuffix || ''}, ${main_data.City}, ${main_data.StateOrProvince}`
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

  return (
    <>
      <div className="screenshot col-12 mt-2">

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
            <div className="">
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
            </div>
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

      <hr className="my-10 sm:my-20" />
      <h1 className="text-2xl font-bold mb-2">Property Overview</h1>
      <PropertyDataTable main_data={main_data} />

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
        <h2 className="font-bold pb-3 text-lg sm:text-2xl pt-3">
          <Image
            width={50}
            height={50}
            alt="walking  "
            className="w-8 sm:w-10 inline mr-2"
            src="/property-page-img/walking.svg"
          />
          Walk Score for {main_data.StreetNumber} {main_data.StreetName}
        </h2>

        <div className="">
          <div className="">
            <div className="walkscore-container mt-2 rounded-mine">
              <script type="text/javascript"></script>
              {/* <div id="ws-walkscore-tile" className="ham2 w-full"> */}
              <iframe
                height="500px"
                title="Walk Score"
                className="ham p-0"
                width="100%"
                src={`https://www.walkscore.com/serve-walkscore-tile.php?wsid=&amp&s=${walkscoreAddress}&amp;o=h&amp;c=f&amp;h=500&amp;fh=0&amp;w=737`}
              ></iframe>
             
              {/* </div> */}
              <script
                type="text/javascript"
                src="https://www.walkscore.com/tile/show-walkscore-tile.php"
              ></script>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyPage;
