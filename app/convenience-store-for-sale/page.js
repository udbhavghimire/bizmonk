import {
  getConvenienceStoreListings,
  getSaleOfBusinessListings,
} from "@/api/getBusinessListings";
import Breadcrumb from "@/components/Breadcrumb";
import ResaleCard from "@/components/ResaleCard";
import citiesData from "@/data/gta-cities.json";
import { notFound } from "next/navigation";

const { cities } = citiesData;

export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.toLowerCase(),
  }));
}

export default async function page({ params }) {
  const breadcrumbItems = [
    {
      label: "Convenience Stores for Sale",
    },
  ];

  const CONVENIENCESTORELISTINGS = await getConvenienceStoreListings();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Convenience Stores for Sale in Ontario
        </h1>

        {/* Store Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONVENIENCESTORELISTINGS.map((listing) => (
            <ResaleCard curElem={listing} key={listing.ListingKey} />
          ))}
        </div>
      </div>
    </div>
  );
}
