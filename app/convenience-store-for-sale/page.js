import { cities } from "@/data/gta-cities.json";
import Link from "next/link";

export default function ConvenienceStoresForSale() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Convenience Stores for Sale
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <Link
              key={city}
              href={`/convenience-store-for-sale/${city.toLowerCase()}`}
              className="block bg-white shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900">{city}</h2>
              <p className="mt-2 text-gray-500">
                View convenience stores for sale in {city}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
