"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TimeAgo from "./TimeAgo";
import { getImageUrls } from "@/api/getImageUrls";
import { LandPlot, Timer, Heart } from "lucide-react";
import { slugGenerator } from "@/helpers/slugGenerator";
import Image from "next/image";

const ResaleCard = ({ curElem, small = false, showDecreasedPrice = false }) => {
  const [loadingImage, setLoadingImage] = useState(true);
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
    e.target.src = `/icons/no-photo.png`;
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoadingImage(true);
        const urls = await getImageUrls({ 
          ResourceRecordKey: curElem.ListingKey, 
          size: 'medium'
        });
        if (urls?.length > 0) {
          setImgUrl(urls[0]);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      } finally {
        setLoadingImage(false);
      }
    };

    if (curElem.ListingKey) {
      fetchImage();
    }
  }, [curElem.ListingKey]);

  const aboutProperty = () => {
    let description;
    if (curElem.BusinessType && curElem.PropertySubType) {
      description = `${curElem.BusinessType.join(",")}, ${
        curElem.PropertySubType
      }`;
    } else if (curElem.PropertySubType)
      description = `${curElem.PropertySubType || null}`;
    else if (curElem.BusinessType) description = curElem.BusinessType.join(",");
    else description = "Property";

    if (curElem.SaleLease) description += ` for ${curElem.SaleLease}`;
    return description;
  };

  const listingUrl = `/${curElem.City.toLowerCase().replace(/\s+/g, "-")}/${slugGenerator({
    Street: curElem.StreetNumber || "",
    StreetName: curElem.StreetName || "",
    StreetAbbreviation: curElem.StreetSuffix || "",
    Municipality: curElem.City || "",
    ListingKey: curElem.ListingKey || curElem.MLS,
  })}`;

  return (
    <div className="w-full">
      <Link href={listingUrl} className="text-black">
        <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-all duration-200 flex flex-col">
          {/* Image Container */}
          <div className="relative h-72 flex-shrink-0">
            {loadingImage ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 animate-pulse">
                <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : imgUrl ? (
              <div className="relative w-full h-full group">
                <img
                  src={imgUrl}
                  alt={`${curElem.StreetNumber} ${curElem.StreetName}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={handleImageError}
                />
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px]">
                  {aboutProperty()}
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center bg-gray-50">
                <img src="/icons/no-photo.png" className="w-8 h-8" alt="No photo" />
                <p className="text-gray-500 text-sm mt-2">No Image Available</p>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-3 flex-1 flex flex-col">
            {/* Price */}
            <div className="text-2xl font-bold mb-2">
              {price}
              {curElem.SaleLease === saleLease.lease.value && <span> /mo</span>}
            </div>

            {/* Property Details */}
            <div className="flex items-center gap-4 md:text-xs text-[10px] text-gray-600 mb-2">
              {curElem.BuildingAreaTotal && (
                <div className="flex items-center gap-1">
                  <LandPlot className="w-4 h-4" />
                  <span>
                    {curElem.BuildingAreaTotal > 0
                      ? Math.floor(curElem.BuildingAreaTotal)
                      : "N/A"}{" "}
                    sq. ft.
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Timer className="w-4 h-4" />
                <TimeAgo modificationTimestamp={curElem.OriginalEntryTimestamp} />
              </div>
            </div>

            {/* Address */}
            <div className="md:text-sm text-[12px] text-gray-800 mb-1">
              {curElem.StreetName
                ? `${curElem.StreetNumber} ${curElem.StreetName} ${curElem.StreetSuffix || ""}`
                : ""} {curElem.City}, Ontario
            </div>

            {/* Footer Info */}
            <div className="flex flex-col gap-1 text-xs text-gray-500 pt-2 mt-auto border-t">
              <div>MLS® #{curElem.ListingKey}</div>
              {/* <div>Listed by {curElem.ListOfficeName}</div> */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ResaleCard;
