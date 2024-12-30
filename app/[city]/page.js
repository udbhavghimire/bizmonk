import citiesData from "@/data/gta-cities.json";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";

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
      label: "Home",
      href: "/",
    },
    {
      label: cityName,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Business Opportunities in {cityName}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Restaurant Section */}
          <Link
            href={`/${cityUrl}/restaurant-for-sale`}
            className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                Restaurants for Sale
              </h2>
              <p className="mt-4 text-gray-600">
                Browse available restaurant spaces and turnkey operations in{" "}
                {cityName}.
              </p>
            </div>
          </Link>

          {/* Convenience Store Section */}
          <Link
            href={`/${cityUrl}/convenience-store-for-sale`}
            className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                Convenience Stores for Sale
              </h2>
              <p className="mt-4 text-gray-600">
                Explore convenience store opportunities in {cityName}.
              </p>
            </div>
          </Link>

          {/* Offices Section */}
          <Link
            href={`/${cityUrl}/offices-for-lease`}
            className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                Offices for Lease
              </h2>
              <p className="mt-4 text-gray-600">
                Find the perfect office space in {cityName}.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
