import { cities } from "@/data/gta-cities.json";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.toLowerCase(),
  }));
}

export default async function CityPage({ params }) {
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
            href={`/${params.city}/restaurant-for-sale`}
            className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                Restaurants for Sale
              </h2>
              <p className="mt-4 text-gray-600">
                Browse available restaurant spaces and turnkey operations in{" "}
                {cityName}
              </p>
            </div>
          </Link>

          {/* Convenience Store Section */}
          <Link
            href={`/${params.city}/convenience-store-for-sale`}
            className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                Convenience Stores for Sale
              </h2>
              <p className="mt-4 text-gray-600">
                Explore convenience store opportunities in {cityName}
              </p>
            </div>
          </Link>

          {/* Offices Section */}
          <Link
            href={`/${params.city}/offices-for-lease`}
            className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                Offices for Lease
              </h2>
              <p className="mt-4 text-gray-600">
                Find the perfect office space in {cityName}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
