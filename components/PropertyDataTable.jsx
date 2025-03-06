"use client";
import useDeviceView from "@/helpers/useDeviceView";
import React from "react";
import formatCurrency from "@/helpers/formatCurrency";
import TimeAgo from "@/helpers/TimeAgo";

const PropertyDataTable = ({ main_data }) => {
  const { isMobileView } = useDeviceView();
  const TaxAnnualAmount = formatCurrency(main_data?.TaxAnnualAmount);
  const ListPrice = formatCurrency(main_data?.ListPrice);
  const GrossIncome = formatCurrency(main_data?.GrossIncome);

  return (
    <div className="w-full">
      {/* Basic Property Info */}
      <div className={`grid grid-cols-2 md:grid-cols-4 w-full gap-2 ${isMobileView ? "flex-wrap" : "flex-nowrap"}`}>
        <div className="col-span-1 md:col-span-1 border-b border-gray-200 py-2 md:py-3 pr-0">
          <p className="font-bold text-black">Property type</p>
        </div>
        <div className="col-span-1 md:col-span-1 border-b border-gray-200 py-2 md:py-3 pl-0">
          <p className="text-black">{main_data.PropertyType} - {main_data.PropertySubType}</p>
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

      {/* Financial Information */}
      <div className={`grid grid-cols-2 md:grid-cols-4 w-100 ${isMobileView ? "flex-wrap" : "flex-nowrap"}`}>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">List Price</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">{ListPrice}</p>
        </div>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">Gross Income</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">{GrossIncome || "N/A"}</p>
        </div>
      </div>

      {/* Tax Information */}
      <div className={`grid grid-cols-2 md:grid-cols-4 w-100 ${isMobileView ? "flex-wrap" : "flex-nowrap"}`}>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">Annual Taxes</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">{TaxAnnualAmount}</p>
        </div>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">Tax year</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">{main_data.TaxYear || "N/A"}</p>
        </div>
      </div>

      {/* Business Details */}
      <div className={`grid grid-cols-2 md:grid-cols-4 w-100 ${isMobileView ? "flex-wrap" : "flex-nowrap"}`}>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">Business Type</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">{main_data.BusinessType || "N/A"}</p>
        </div>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">Years in Business</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">{main_data.YearsInBusiness || "N/A"}</p>
        </div>
      </div>

      {/* Location & Status */}
      <div className={`grid grid-cols-2 md:grid-cols-4 w-100 ${isMobileView ? "flex-wrap" : "flex-nowrap"}`}>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">Location</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">{main_data.City}, {main_data.StateOrProvince}</p>
        </div>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">Status</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">{main_data.StandardStatus}</p>
        </div>
      </div>

      {/* Additional Business Info */}
      <div className={`grid grid-cols-2 md:grid-cols-4 w-100 ${isMobileView ? "flex-wrap" : "flex-nowrap"}`}>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">Franchise</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">{main_data.IsFranchise ? "Yes" : "No"}</p>
        </div>
        <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
          <p className="cardd-subtitle_bg-black font-bold">Last Updated</p>
        </div>
        <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
          <p className="cardd-subtitle_bg-black">
            <TimeAgo modificationTimestamp={main_data.ModificationTimestamp} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDataTable;
