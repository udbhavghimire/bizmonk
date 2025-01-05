import Breadcrumb from "@/components/Breadcrumb";
import ResaleCard from "@/components/ResaleCard";
import citiesData from "@/data/gta-cities.json";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import { notFound } from "next/navigation";

const { cities } = citiesData;

export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.toLowerCase(),
  }));
}

export default async function CityConvenienceStores({ params }) {
  const { city } = await params;

  if (!city) {
    notFound();
  }

  const cityExists = cities.find((c) => c.toLowerCase() === city.toLowerCase());

  if (!cityExists) {
    notFound();
  }

  const breadcrumbItems = [
    {
      label: cityExists,
      href: `/${city.toLowerCase()}`,
    },
    {
      label: "Convenience Stores for Sale",
    },
  ];

  const options = {
    method: "GET",
    headers: {
      Authorization: process.env.BEARER_TOKEN_FOR_API,
    },
  };

  const SALEOFBUSINESSLISTINGS = await fetch(
    `https://query.ampre.ca/odata/Property?$filter=contains(City,'${capitalizeFirstLetter(
      city
    )}') and PropertySubType eq 'Sale Of Business'&$top=500&$orderby=OriginalEntryTimestamp desc`,
    options
  ).then((response) => response.json());

  const CONVENIENCESTORELISTINGS = SALEOFBUSINESSLISTINGS.value.filter(
    (listing) => listing.BusinessType.includes("Convenience/Variety")
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Convenience Stores for Sale in {cityExists}
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
