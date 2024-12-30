import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import citiesData from "@/data/gta-cities.json";

const { cities } = citiesData;

export async function generateStaticParams() {
  // Generate the static parameters for dynamic routes
  return cities.map((city) => ({
    city: city.toLowerCase(),
  }));
}

export default async function CityRestaurants({ params }) {
  // Safely await the params
  const { city } = await params;

  if (!city) {
    notFound(); // If no city parameter, show 404
  }

  // Ensure city exists in the cities data
  const cityExists = cities.find((c) => c.toLowerCase() === city.toLowerCase());

  if (!cityExists) {
    notFound(); // If city doesn't exist, show 404
  }

  // Prepare breadcrumb items for navigation
  const breadcrumbItems = [
    { label: cityExists, href: `/${cityExists.toLowerCase()}` },
    { label: "Restaurants for Sale" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Restaurants for Sale in {cityExists}
        </h1>

        {/* Example of listing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Premium Restaurant Space
              </h3>
              <p className="mt-2 text-gray-600">
                Well-established location with modern kitchen
              </p>
              <div className="mt-4 text-blue-600 font-medium">
                View Details →
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
