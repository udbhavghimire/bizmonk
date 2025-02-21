import Breadcrumb from "@/components/Breadcrumb";
import { cities } from "@/constant/cities";
import { notFound } from "next/navigation";
import { getOfficeListings } from "@/api/getBusinessListings";
import OfficeListings from "@/components/OfficeListings";
import { businessDescriptions } from "@/data/business-descriptions";
import Image from "next/image";
import Link from "next/link";

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

        {/* Cities Section */}
        <div className="py-24">
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

        {/* Content Section */}
        <div className="mt-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">
            {businessDescriptions.office.title}
          </h2>
          {businessDescriptions.office.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="mb-4 text-gray-700 whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
