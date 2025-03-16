"use client";
import { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { cities } from "@/constant/cities";
import { notFound, useSearchParams } from "next/navigation";
import { getOfficeListings } from "@/api/getBusinessListings";
import OfficeListings from "@/components/OfficeListings";
import { businessDescriptions } from "@/data/business-descriptions";
import Image from "next/image";
import Link from "next/link";
import Filter from "@/components/Filter";

export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.toLowerCase(),
  }));
}

export default function RetailLeasePage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const propertyTypeSlug = searchParams.get("type");
  const priceParam = searchParams.get("price");

  // Function to convert slug back to display name
  const getDisplayNameFromSlug = (slug) => {
    if (!slug) return null;

    const displayMap = {
      "medical-dental": "Medical/Dental",
      "professional-office": "Professional Office",
      industrial: "Industrial",
      warehouse: "Warehouse",
      retail: "Retail",
    };

    return displayMap[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
  };

  // Get the display name for the property type
  const propertyType = getDisplayNameFromSlug(propertyTypeSlug);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // Parse price range if present
        let priceRange = null;
        if (priceParam) {
          const [min, max] = priceParam.split("-").map(Number);
          if (!isNaN(min) && !isNaN(max)) {
            priceRange = { min, max };
          }
        }

        // Fetch listings with any filters
        const listings = await getOfficeListings({
          priceRange,
        });

        // Apply property type filter if needed
        let filteredData = listings;
        if (propertyType && propertyType !== "All Properties") {
          filteredData = listings.filter(
            (listing) =>
              listing.BusinessType &&
              listing.BusinessType.includes(propertyType)
          );
        }

        setData(filteredData);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [propertyType, priceParam]);

  const handleFilterChange = async (filters) => {
    setIsLoading(true);
    try {
      const listings = await getOfficeListings({
        priceRange: filters.priceRange,
      });

      let filteredData = listings;
      if (filters.propertyType) {
        filteredData = listings.filter(
          (listing) =>
            listing.BusinessType &&
            listing.BusinessType.includes(filters.propertyType)
        );
      }

      setData(filteredData);
    } catch (error) {
      console.error("Error applying filters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {propertyType ? `${propertyType} Properties` : "Retail Lease"} in
          Ontario
        </h1>

        <Filter onFilterChange={handleFilterChange} />

        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <OfficeListings initialData={data} />
        )}

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
