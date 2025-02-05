import { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import citiesData from "@/data/gta-cities.json";
import { notFound } from "next/navigation";
import ResaleCard from "@/components/ResaleCard";
import { getOfficeListings } from "@/api/getBusinessListings";
import Pagination from "@/components/Pagination";

const { cities } = citiesData;

export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.toLowerCase(),
  }));
}

export default async function CityOffices() {
  const data = await getOfficeListings({});

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Offices for Lease in Ontario
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {data.map((listing) => (
            <ResaleCard curElem={listing} key={listing.ListingKey} />
          ))}
        </div>

        {data.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No listings found
          </div>
        )}
      </div>
    </div>
  );
}
