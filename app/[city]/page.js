import citiesData from "@/data/gta-cities.json";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import {
  getConvenienceStoreListings,
  getOfficeListings,
  getRestaurantListings,
} from "@/api/getBusinessListings";
import ResaleCard from "@/components/ResaleCard";

const cities = citiesData.cities;

// Helper function to convert city names to URL-friendly format
const toUrlFormat = (cityName) => cityName.toLowerCase().replace(/\s+/g, "-");

// Helper function to find city by URL format
const findCityByUrlFormat = (urlFormat) => {
  return cities.find((city) => toUrlFormat(city) === urlFormat.toLowerCase());
};

export default async function CityPage({ params }) {
  const { city } = await params;

  if (!city) {
    notFound();
  }

  // Find the city using the URL-friendly format
  const cityExists = findCityByUrlFormat(city);

  if (!cityExists) {
    notFound();
  }

  const cityName = cityExists;
  const cityUrl = toUrlFormat(cityName); // Use this for links

  const breadcrumbItems = [
    {
      label: cityName,
    },
  ];

  const restaurantListings = await getRestaurantListings({
    city: cityName,
    numberOfListings: 4,
  });
  const convenienceStoreListings = await getConvenienceStoreListings({
    city: cityName,
    numberOfListings: 4,
  });
  const officeListings = await getOfficeListings({
    city: cityName,
    numberOfListings: 4,
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Business Opportunities in {cityName}
        </h1>

        <div className="flex flex-col">
          {/* Restaurant Section */}
          <div>
            <div className="p-8">
              <div className="flex justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Restaurants for Sale
                </h2>
                <Link
                  href={`/${cityUrl}/restaurant-for-sale`}
                  className="bg-black rounded-md px-2 py-2 hover:scale-105"
                >
                  View More
                </Link>
              </div>
              <div className="grid grid-cols-4 gap-x-3">
                {restaurantListings.map((data) => (
                  <ResaleCard curElem={data} />
                ))}
              </div>
            </div>
          </div>

          {/* Convenience Store Section */}
          <div>
            <div className="p-8">
              <div className="flex justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Convenience Stores for Sale
                </h2>
                <Link
                  href={`/${cityUrl}/convenience-store-for-sale`}
                  className="bg-black rounded-md px-2 py-2 hover:scale-105"
                >
                  View More
                </Link>
              </div>
              <div className="grid grid-cols-4 gap-x-3">
                {convenienceStoreListings.map((data) => (
                  <ResaleCard curElem={data} />
                ))}
              </div>
            </div>
          </div>

          {/* Offices Section */}
          <div>
            <div className="p-8">
              <div className="flex justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Offices for Lease
                </h2>
                <Link
                  href={`/${cityUrl}/offices-for-lease`}
                  className="bg-black rounded-md px-2 py-2 hover:scale-105"
                >
                  View More
                </Link>
              </div>
              <div className="grid grid-cols-4 gap-x-3">
                {officeListings.map((data) => (
                  <ResaleCard curElem={data} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
