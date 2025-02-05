import Breadcrumb from "@/components/Breadcrumb";
import citiesData from "@/data/gta-cities.json";
import { notFound } from "next/navigation";
import { getOfficeListings } from "@/api/getBusinessListings";
import OfficeListings from "@/components/OfficeListings";

const { cities } = citiesData;

export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.toLowerCase(),
  }));
}

export default async function CityOffices() {
  const data = await getOfficeListings({});

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Offices for Lease in Ontario
        </h1>

        <OfficeListings initialData={data} />
      </div>
    </div>
  );
}
