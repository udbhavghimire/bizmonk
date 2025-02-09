import { Suspense } from "react";
import citiesData from "@/data/gta-cities.json";
import { notFound } from "next/navigation";
import { getSaleOfBusinessListings } from "@/api/getBusinessListings";
import ClientPage from "./ClientPage";
import Image from "next/image";
import Link from "next/link";
import { cities } from "@/constant/cities";
import CityContent from "@/data/CityContent";

const ITEMS_PER_PAGE = 20;

// Helper function to convert city names to URL-friendly format
const toUrlFormat = (cityName) => cityName.toLowerCase().replace(/\s+/g, "-");

// Helper function to find city by URL format
const findCityByUrlFormat = (urlFormat) => {
  return citiesData.cities.find(
    (city) => toUrlFormat(city) === urlFormat.toLowerCase()
  );
};

async function getCityData(city) {
  const cityExists = findCityByUrlFormat(city);
  if (!cityExists) return null;

  try {
    const data = await getSaleOfBusinessListings(cityExists);
    return {
      cityName: cityExists,
      listings: data?.value || [],
    };
  } catch (error) {
    console.error("Error fetching listings:", error);
    return {
      cityName: cityExists,
      listings: [],
    };
  }
}

export default async function Page({ params }) {
  const data = await getCityData(params.city);

  if (!data) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
      <ClientPage initialData={data.listings} cityName={data.cityName} />

      {/* Cities Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Business Properties for sale in your city
          </h2>
          <p className="text-lg text-gray-600">
            Explore top cities across Canada
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cities?.map((city) => (
            <Link
              key={city.name}
              href={`/${city.name.toLowerCase()}`}
              className="group relative rounded-lg overflow-hidden aspect-[4/3]"
            >
              <Image
                src={city.image}
                alt={`${city.name} cityscape`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                {city.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      {/* New SEO Content Section */}
      <CityContent cityName={data.cityName} />
    </Suspense>
  );
}
