import { Suspense } from "react";
import citiesData from "@/data/gta-cities.json";
import { notFound } from "next/navigation";
import { getSaleOfBusinessListings } from "@/api/getBusinessListings";
import ClientPage from "./ClientPage";

const cities = citiesData.cities;
const ITEMS_PER_PAGE = 20;

// Helper function to convert city names to URL-friendly format
const toUrlFormat = (cityName) => cityName.toLowerCase().replace(/\s+/g, "-");

// Helper function to find city by URL format
const findCityByUrlFormat = (urlFormat) => {
  return cities.find((city) => toUrlFormat(city) === urlFormat.toLowerCase());
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
    </Suspense>
  );
}
