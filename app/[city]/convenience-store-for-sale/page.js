import Breadcrumb from "@/components/Breadcrumb";
import { cities } from "@/data/gta-cities.json";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.toLowerCase(),
  }));
}

export default async function CityConvenienceStores({ params }) {
  const cityExists = cities.find(
    (c) => c.toLowerCase() === params.city.toLowerCase()
  );

  if (!cityExists) {
    notFound();
  }

  const cityName = cityExists;

  const breadcrumbItems = [
    {
      label: cityName,
      href: `/${params.city}`,
    },
    {
      label: "Convenience Stores for Sale",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Convenience Stores for Sale in {cityName}
        </h1>

        {/* Store Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example listing card - repeat or map through actual listings */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Corner Store Opportunity
              </h3>
              <p className="mt-2 text-gray-600">
                High-traffic location with established customer base
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
