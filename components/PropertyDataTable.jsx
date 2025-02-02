"use client";
import useDeviceView from "@/helpers/useDeviceView";
import React, { useState } from "react";
import formatCurrency from "@/helpers/formatCurrency";
import TimeAgo from "@/helpers/TimeAgo";
import Link from "next/link";

const PropertyDataTable = ({ main_data }) => {
  const getCommunityFeatures = () => {
    const features = main_data.CommunityFeatures || [];
    return features.length > 0 ? features.join(", ") : "N/A";
  };

  const [collapse, setCollapse] = useState(true);
  const { isMobileView } = useDeviceView();

  const TaxAnnualAmount = formatCurrency(main_data?.TaxAnnualAmount);
  const AssociationFee = formatCurrency(main_data?.AssociationFee);
  
  const formatNumber = (value) => {
    if (value != null) {
      return Number(value).toLocaleString("en-US");
    } else {
      return "N/A";
    }
  };

  return (
    <>
      <div className={`grid grid-cols-2 md:grid-cols-4 w-full ${isMobileView ? "flex-wrap" : "flex-nowrap"}`}>
        <div className="col-span-1 md:col-span-1 border-b border-gray-200 py-2 md:py-3 pr-0">
          <p className="font-bold text-black">Property type</p>
        </div>
        <div className="col-span-1 md:col-span-1 border-b border-gray-200 py-2 md:py-3 pl-0">
          <p className="text-black">{main_data.PropertyType} - {main_data.PropertySubType}</p>
        </div>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 border-sm py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">Lot size</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 border-sm py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">
            {main_data.LotWidth} X {main_data.LotDepth} {main_data.LotSizeUnits}
          </p>
        </div>
      </div>

      <div className={`grid grid-cols-2 md:grid-cols-4 w-100 ${isMobileView ? "flex-wrap" : "flex-nowrap"}`}>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">Style</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">{main_data.ArchitecturalStyle?.join(", ") || "N/A"}</p>
        </div>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">Building Area</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">
            {main_data.BuildingAreaTotal || "N/A"} {main_data.BuildingAreaUnits || ""}
          </p>
        </div>
      </div>

      <div className={`grid grid-cols-2 md:grid-cols-4 w-100 ${isMobileView ? "flex-wrap" : "flex-nowrap"}`}>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">Walk Score</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">
            {main_data.WalkScore ? (
              <div className="flex items-center gap-2">
                <span>{main_data.WalkScore}</span>
                <span className="text-sm text-gray-500">/ 100</span>
              </div>
            ) : (
              "Not Available"
            )}
          </p>
        </div>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">Transit Score</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">
            {main_data.TransitScore ? (
              <div className="flex items-center gap-2">
                <span>{main_data.TransitScore}</span>
                <span className="text-sm text-gray-500">/ 100</span>
              </div>
            ) : (
              "Not Available"
            )}
          </p>
        </div>
      </div>

      <div className={`grid grid-cols-2 md:grid-cols-4 w-100 ${isMobileView ? "flex-wrap" : "flex-nowrap"}`}>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">Taxes</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">{TaxAnnualAmount}</p>
        </div>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">Tax year</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">{main_data.TaxYear}</p>
        </div>
      </div>

      <div className={`grid grid-cols-2 md:grid-cols-4 w-100 ${isMobileView ? "flex-wrap" : "flex-nowrap"}`}>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">Parking spaces</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">{formatNumber(main_data.ParkingSpaces)}</p>
        </div>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">MLS®</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">{main_data.ListingKey}</p>
        </div>
      </div>

      <div className={`grid grid-cols-2 md:grid-cols-4 w-100 ${isMobileView ? "flex-wrap" : "flex-nowrap"}`}>
        <div className="col-span-1 md:col-span-1 border-b border-gray-200 py-2 md:py-3 pr-0">
          <p className="font-bold text-black">Last updated</p>
        </div>
        <div className="col-span-1 md:col-span-1 border-b border-gray-200 py-2 md:py-3 pl-0">
          <p className="text-black">
            <TimeAgo modificationTimestamp={main_data.ModificationTimestamp} />
          </p>
        </div>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">Virtual tour</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">
            {main_data.VirtualTourURLUnbranded ? (
              <Link href={main_data.VirtualTourURLUnbranded} target="_blank">
                Tour Now
              </Link>
            ) : (
              "Not Available"
            )}
          </p>
        </div>
      </div>

      <div className={`grid grid-cols-2 md:grid-cols-4 w-100 ${isMobileView ? "flex-wrap" : "flex-nowrap"}`}>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">Basement</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">
            {main_data.Basement?.join(", ") || "None"}
          </p>
        </div>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">Building size</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">
            {main_data.BuildingAreaTotal || "N/A"} {main_data.BuildingAreaUnits || ""}
          </p>
        </div>
      </div>

      <div className={`grid grid-cols-2 md:grid-cols-4 w-100 ${isMobileView ? "flex-wrap" : "flex-nowrap"}`}>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">Status</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">{main_data.StandardStatus}</p>
        </div>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">Property sub type</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">{main_data.PropertySubType}</p>
        </div>
      </div>

      <div className={`grid grid-cols-2 md:grid-cols-4 w-100 ${isMobileView ? "flex-wrap" : "flex-nowrap"}`}>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">Association fee</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">{AssociationFee || "N/A"}</p>
        </div>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">Year built</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">{main_data.AssessmentYear || "N/A"}</p>
        </div>
      </div>

      <div className={`block ${collapse ? "hidden" : "block"}`} id="collapseExample">
        {/* Interior */}
        <h5 className="py-2 font-bold pt-5">Interior</h5>
        <div className={`grid grid-cols-2 md:grid-cols-4 w-100 ${isMobileView ? "flex-wrap" : "flex-nowrap"}`}>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black font-bold">Total bathrooms</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">{main_data.BathroomsTotalInteger}</p>
          </div>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black font-bold">Total bedrooms</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">{main_data.BedroomsTotal}</p>
          </div>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-4 w-100 ${isMobileView ? "flex-wrap" : "flex-nowrap"}`}>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black font-bold">Above grade bedrooms</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">{main_data.BedroomsAboveGrade}</p>
          </div>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black font-bold">Below grade bedrooms</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">{main_data.BedroomsBelowGrade}</p>
          </div>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-4 w-100 ${isMobileView ? "flex-wrap" : "flex-nowrap"}`}>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black font-bold">Total kitchens</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">{main_data.KitchensTotal}</p>
          </div>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black font-bold">Total rooms</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">{main_data.RoomsTotal || (main_data.RoomsAboveGrade + main_data.RoomsBelowGrade)}</p>
          </div>
        </div>

        {/* Exterior */}
        <h5 className="py-2 font-bold pt-5">Exterior</h5>
        <div className={`grid grid-cols-2 md:grid-cols-4 w-100 ${isMobileView ? "flex-wrap" : "flex-nowrap"}`}>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black font-bold">Construction materials</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">{main_data.ConstructionMaterials?.join(", ") || "N/A"}</p>
          </div>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black font-bold">Other structures</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">{main_data.OtherStructures?.join(", ") || "N/A"}</p>
          </div>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-4 w-100 ${isMobileView ? "flex-wrap" : "flex-nowrap"}`}>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black font-bold">Garage type</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">{main_data.GarageType}</p>
          </div>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black font-bold">Parking spaces</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">{main_data.ParkingSpaces}</p>
          </div>
        </div>

        {/* Amenities / Utilities */}
        <h5 className="py-2 font-bold pt-5">Amenities / Utilities</h5>
        <div className={`grid grid-cols-2 md:grid-cols-4 w-100 ${isMobileView ? "flex-wrap" : "flex-nowrap"}`}>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black font-bold">Cooling</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">{main_data.Cooling?.join(", ") || "N/A"}</p>
          </div>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black font-bold">Heat source</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">{main_data.HeatSource}</p>
          </div>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-4 w-100 ${isMobileView ? "flex-wrap" : "flex-nowrap"}`}>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black font-bold">Heat type</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">{main_data.HeatType}</p>
          </div>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black font-bold">Sewer</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">{main_data.Sewer?.join(", ") || "N/A"}</p>
          </div>
        </div>

        {/* Location */}
        <h5 className="py-2 font-bold pt-5">Location</h5>
        <div className={`grid grid-cols-2 md:grid-cols-4 w-100 ${isMobileView ? "flex-wrap" : "flex-nowrap"}`}>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black font-bold">City</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">{main_data.City}</p>
          </div>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black font-bold">Province</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">{main_data.StateOrProvince}</p>
          </div>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-4 w-100 ${isMobileView ? "flex-wrap" : "flex-nowrap"}`}>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black font-bold">Postal code</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">{main_data.PostalCode}</p>
          </div>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black font-bold">Cross streets</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">{main_data.CrossStreet || "N/A"}</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => setCollapse(!collapse)}
        className="bg-black underline px-2 border-2 border-black py-1 text-white font-semibold rounded-lg hover:text-black hover:bg-gray-200 focus:outline-none transition-colors duration-200 sm:my-2 mt-2 mb-4"
      >
        See {collapse ? "More" : "Less"}
      </button>
    </>
  );
};

export default PropertyDataTable;
