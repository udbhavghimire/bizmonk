"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TimeAgo from "./TimeAgo";
import { getImageUrls } from "@/api/getImageUrls";
import { Heart } from "lucide-react";
import { slugGenerator } from "@/helpers/slugGenerator";

const ResaleCard = ({ curElem, small = false, showDecreasedPrice = false }) => {
  const [loadingImage, setLoadingImage] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    `https://pillar9.homebaba.ca/images/${curElem.ListingKey}-0.jpg?cardImage=true`,
  );
  const [hasImageError, setHasImageError] = useState(false);

  const price = Number(curElem.ListPrice).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const saleLease = {
    sale: { name: "For Sale", value: "Sale" },
    lease: { name: "For Lease", value: "Lease" },
  };

  const handleImageError = () => {
    setHasImageError(true);
  };

  // useEffect(() => {
  //   const fetchImage = async () => {
  //     try {
  //       setLoadingImage(true);
  //       const urls = await getImageUrls({
  //         ResourceRecordKey: curElem.ListingKey,
  //         size: "medium",
  //       });
  //       if (urls?.length > 0) {
  //         setImgUrl(
  //           `https://pillar9.homebaba.ca/images/${curElem.ListingKey}-0.jpg?cardImage=true`
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error fetching image:", error);
  //     } finally {
  //       setLoadingImage(false);
  //     }
  //   };

  //   if (curElem.ListingKey) {
  //     fetchImage();
  //   }
  // }, [curElem.ListingKey]);

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

  const listingUrl = `/${curElem.City.toLowerCase().replace(
    /\s+/g,
    "-",
  )}/${slugGenerator({
    Street: curElem.StreetNumber || "",
    StreetName: curElem.StreetName || "",
    StreetAbbreviation: curElem.StreetSuffix || "",
    Municipality: curElem.City || "",
    ListingKey: curElem.ListingKey || curElem.MLS,
  })}`;

  return (
    <div className="w-full p-0.5">
      <Link href={listingUrl}>
        <div className="group relative flex flex-col rounded-lg transition-all duration-300 hover:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          {/* Image Container */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-50">
            {curElem.Media && curElem.Media.length > 0 ? (
              <img
                src={curElem.Media[0].MediaURL}
                alt={`${curElem.StreetNumber} ${curElem.StreetName}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.src = "/icons/no-photo.png";
                }}
              />
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center bg-gray-100">
                <img
                  src="/icons/no-photo.png"
                  className="w-32 h-32"
                  alt="No photo available"
                />
              </div>
            )}

            {/* Heart Icon */}
            <button className="absolute top-3 right-3 bg-white rounded-full p-1.5 hover:bg-gray-100 z-10">
              <Heart className="w-5 h-5" />
            </button>

            {/* Property Type & Time Badge */}
            <div className="absolute bottom-3 left-3 flex gap-2 z-10">
              <span className="bg-white rounded px-2.5 py-1 text-xs font-medium">
                {curElem.BusinessType}
              </span>
              <span className="bg-white rounded px-2.5 py-1 text-xs font-medium">
                <TimeAgo
                  modificationTimestamp={curElem.OriginalEntryTimestamp}
                />
              </span>
            </div>

            {/* Dark Overlay on Hover */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          {/* Content */}
          <div className="pt-3 flex flex-col px-1">
            {/* Price */}
            <div className="text-[24px] font-bold text-gray-900">{price}</div>

            {/* Property Details */}
            <div className="flex items-center gap-2 mt-1 text-sm">
              {curElem.BedroomsTotal && (
                <span className="text-gray-700">
                  {curElem.BedroomsTotal} Bed
                </span>
              )}
              {curElem.BathroomsTotalInteger && (
                <>
                  <span className="text-gray-700">
                    {curElem.BathroomsTotalInteger} Bath
                  </span>
                </>
              )}
              {curElem.BuildingAreaTotal && (
                <>
                  <span className="text-gray-700">
                    {Math.floor(curElem.BuildingAreaTotal).toLocaleString()}{" "}
                    Sq.Ft.
                  </span>
                </>
              )}
            </div>

            {/* Address */}
            <div className="mt-1">
              <div className="text-[15px] text-gray-700 line-clamp-1">
                {curElem.StreetName
                  ? `${curElem.StreetNumber} ${curElem.StreetName} ${
                      curElem.StreetSuffix || ""
                    }`
                  : ""}
                , {curElem.City}, ON
              </div>
            </div>

            {/* Listed By */}
            <div className="mt-1 text-xs text-gray-500">
              Listed by: {curElem.ListOfficeName || "Real Estate Office"}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ResaleCard;
