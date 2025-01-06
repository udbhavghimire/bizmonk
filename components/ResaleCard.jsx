"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TimeAgo from "./TimeAgo";
import { getImageUrls } from "@/api/getImageUrls";

const ResaleCard = ({ curElem, small = false, showDecreasedPrice = false }) => {
  const [loadingImage, setLoadingImage] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const price = Number(curElem.ListPrice).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const saleLease = {
    sale: { name: "For Sale", value: "Sale" },
    lease: { name: "For Lease", value: "Lease" },
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `/noimage.webp`;
  };

  useEffect(() => {
    setLoadingImage(true);
    getImageUrls({ MLS: curElem.ListingKey, thumbnailOnly: true }).then(
      (url) => {
        setImgUrl(url[0]);
        setLoadingImage(false);
      }
    );
  }, []);

  return (
    <section className="relative transition-all duration-200 transform bg-white group rounded-2xl p-0 hover:shadow-lg hover:rounded-t-2xl  hover:-translate-y-1 overflow-hidden">
      <Link href="#" className="text-black">
        <div className="lg:px-0 h-full w-full">
          <div className={`flex flex-col overflow-hidden relative`}>
            <div className={`${"h-52 sm:h-80"} overflow-hidden relative`}>
              <div
                className={`${
                  small ? "h-44" : "h-52 sm:h-80"
                } sm:h-80 relative z-10 rounded-t-2xl`}
              >
                {loadingImage ? (
                  // <Spinner />
                  <>Loading...</>
                ) : (
                  <img
                    className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 rounded-t-2xl"
                    src={imgUrl}
                    width="900"
                    height="800"
                    alt="property image"
                    onError={(e) => {
                      handleImageError(e);
                    }}
                  />
                )}

                {/* <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div> */}
              </div>

              <div className="absolute bottom-3 left-2 flex flex-row z-20">
                <div className="text-black text-[0.7rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-white flex items-center">
                  {curElem.PropertySubType}{" "}
                </div>
                {curElem.ApproxSquareFootage && (
                  <div className="text-black text-[0.7rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-white items-center hidden sm:block">
                    <img
                      src="/resale-card-img/ruler.svg"
                      className="w-3 mr-[2px] inline"
                      alt="washrooms"
                    />
                    <span>{curElem.ApproxSquareFootage} Sq.Ft.</span>
                  </div>
                )}
                {/* <div className="text-black text-[0.7rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-white flex items-center">
                </div> */}
              </div>
            </div>
            <div className="flex-1 sm:px-3 pt-2 pb-4 px-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h2 className="font-bold text-2xl sm:text-2xl items-center justify-start mt-2 sm:my-2">
                  <span className="font-bold text-black">{price}</span>
                  {curElem.SaleLease === saleLease.lease.value && (
                    <span> /mo</span>
                  )}
                </h2>
                <div className="text-xs font-medium text-[#CC0B0B] mb-1 sm:mb-0">
                  <TimeAgo
                    modificationTimestamp={curElem.OriginalEntryTimestamp}
                  />
                </div>
              </div>
              {/* <p className="mb-0 fs-mine text-limit font-md pb-0">
                  {" "}
                  MLS® #{curElem.ListingKey}
                </p> */}
              <span className={`text-black text-xs`}>
                <div className="flex flex-row justify-start">
                  {curElem.BedroomsTotal && (
                    <div className="flex items-center mr-3">
                      <img
                        src="/resale-card-img/bedrooms.svg"
                        className="w-3 mr-[2px] inline"
                        alt="bedrooms"
                      />
                      <span>
                        {Math.floor(curElem.BedroomsTotal)}{" "}
                        <span className="hidden sm:inline">Bed</span>
                      </span>
                    </div>
                  )}
                  {curElem.BathroomsTotalInteger && (
                    <div className="flex items-center mr-3">
                      <img
                        src="/resale-card-img/bathrooms.svg"
                        className="w-3 mr-[2px] inline"
                        alt="washrooms"
                      />
                      <span>
                        {Math.floor(curElem.BathroomsTotalInteger)}{" "}
                        <span className="hidden sm:inline">Bath</span>
                      </span>
                    </div>
                  )}
                  {curElem.GarageParkingSpaces && (
                    <div className="flex items-center mr-3">
                      <img
                        src="/resale-card-img/garage.svg"
                        className="w-3 mr-[2px] inline"
                        alt="washrooms"
                      />
                      <span>
                        {Math.floor(curElem.GarageParkingSpaces)}{" "}
                        <span className="hidden sm:inline">Garage</span>
                      </span>
                    </div>
                  )}
                </div>
              </span>
              <div className="flex flex-row justify-between my-1">
                <div className="text-black">
                  <div className="text-dark text-sm">
                    {curElem.StreetName ? (
                      `${curElem.StreetNumber} ${curElem.StreetName}${" "}
                    ${curElem.StreetSuffix} ${curElem.CountyOrParish}, Ontario`
                    ) : (
                      <span className="p-4"></span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-600">
                MLS® {curElem.ListingKey}
              </div>
              <div className="text-xs text-gray-600">
                Listed by {curElem.ListOfficeName}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default ResaleCard;
