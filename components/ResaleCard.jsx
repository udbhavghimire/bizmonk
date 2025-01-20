"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TimeAgo from "./TimeAgo";
import { getImageUrls } from "@/api/getImageUrls";
import { LandPlot, Timer } from "lucide-react";

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

  useEffect(() => {
    setLoadingImage(true);
    getImageUrls({ MLS: curElem.ListingKey, thumbnailOnly: true }).then(
      (url) => {
        url?.length > 0 && setImgUrl(url[0]);
        setLoadingImage(false);
      }
    );
  }, []);

  return (
    <section className="">
      <Link href={"#"} className="text-black">
        <div className="lg:px-0 h-full w-full">
          <div
            className={`flex flex-col overflow-hidden transition-all duration-200 transform bg-white shadow group rounded-xl p-0 hover:shadow-lg hover:-translate-y-1 relative`}
          >
            <div
              className={`${
                small ? "h-44" : "h-[20rem]"
              } overflow-hidden relative`}
            >
              <div className="h-full relative">
                {loadingImage ? (
                  <>Loading...</>
                ) : imgUrl ? (
                  <img
                    className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 rounded-md"
                    src={imgUrl}
                    alt="property image"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col justify-center items-center">
                    <img src="/icons/no-photo.png" className="w-10 h-10" />
                    <p>No Image Found</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 sm:px-3 py-2 px-2">
              <div className="flex flex-row items-center">
                <div
                  className="text-gray-600 font-normal text-md py-[2px] flex items-center rounded-md mx-1"
                  style={{
                    background: "white",
                  }}
                >
                  {`${aboutProperty()} in ${curElem.City}, ON`}
                </div>
              </div>
              <div className="text-gray-800 text-[0.75rem] p-[2px] rounded-md bg-white flex gap-x-3 items-center">
                <div className="flex gap-x-1">
                  <Timer className="w-4 h-4" />
                  <TimeAgo
                    modificationTimestamp={curElem.OriginalEntryTimestamp}
                  />
                </div>
                {curElem.BuildingAreaTotal && (
                  <div className="flex gap-x-1">
                    <LandPlot className="w-4 h-4" />
                    {curElem.BuildingAreaTotal > 0
                      ? Math.floor(curElem.BuildingAreaTotal)
                      : "N/A"}{" "}
                    sq. ft.
                  </div>
                )}
              </div>
              <hr className="text-gray-600 my-2"></hr>
              <h2 className="font-bold text-xl sm:text-3xl sm:items-center justify-start mw flex flex-col sm:flex-row">
                <div className="min-w-fit ">
                  {price}
                  {""}

                  {curElem.SaleLease === saleLease.lease.value && (
                    <span> /mo</span>
                  )}
                </div>

                {/* <div
                  className={`sm:shadow-lg p-1 sm:ms-1 text-black text-xs min-w-fit ${
                    small && "hidden"
                  }`}
                >
                  {Math.floor(curElem.BuildingAreaTotal)} ft
                  <sup className="text-xs">2</sup>
                </div> */}
              </h2>

              <div className="flex flex-row justify-between pb-1">
                <div className="text-black truncate text-ellipsis">
                  <div className="text-dark text-sm text-wrap">
                    {curElem.StreetName ? (
                      `${curElem.StreetNumber} ${curElem.StreetName}${" "}
                    ${curElem.StreetSuffix || ""} ${curElem.City}, Ontario`
                    ) : (
                      <span className="p-4"></span>
                    )}
                  </div>
                </div>
              </div>
              <p className="mb-0 fs-mine text-limit text-sm pb-0 text-gray-400 ">
                {" "}
                MLS® #{curElem.ListingKey}
              </p>
              <div className="flex flex-row justify-between text-gray-400 text-xs pb-2">
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
