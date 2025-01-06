import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import citiesData from "@/data/gta-cities.json";
import ResaleCard from "@/components/ResaleCard";
import {
  getRestaurantListings,
  getSaleOfBusinessListings,
} from "@/api/getBusinessListings";

const { cities } = citiesData;

export async function generateStaticParams() {
  // Generate the static parameters for dynamic routes
  return cities.map((city) => ({
    city: city.toLowerCase(),
  }));
}

export default async function CityRestaurants({ params }) {
  // Prepare breadcrumb items for navigation
  const breadcrumbItems = [{ label: "Restaurants for Sale" }];

  const RESTAURANTLISTINGS = await getRestaurantListings();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Restaurants for Sale in Ontario
        </h1>

        {/* Example of listing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESTAURANTLISTINGS.map((listing) => (
            <ResaleCard curElem={listing} key={listing.ListingKey} />
          ))}
        </div>
      </div>
    </div>
  );
}
