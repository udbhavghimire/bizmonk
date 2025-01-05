import Breadcrumb from "@/components/Breadcrumb";
import citiesData from "@/data/gta-cities.json";
import { notFound } from "next/navigation";
import ResaleCard from "@/components/ResaleCard";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";

const { cities } = citiesData;

export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.toLowerCase(),
  }));
}

export default async function CityOffices({ params }) {
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
      label: "Offices for Lease",
    },
  ];

  const options = {
    method: "GET",
    headers: {
      Authorization: process.env.BEARER_TOKEN_FOR_API,
    },
  };

  const OFFICELEASELISTINGS = await fetch(
    `https://query.ampre.ca/odata/Property?$filter=contains(City,'${capitalizeFirstLetter(
      city
    )}') and PropertySubType eq 'Office'`,
    options
  ).then((response) => response.json());

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Offices for Lease in {cityExists}
        </h1>

        {/* Office Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OFFICELEASELISTINGS.value.map((listing) => (
            <ResaleCard curElem={listing} key={listing.ListingKey} />
          ))}
        </div>
      </div>
    </div>
  );
}
