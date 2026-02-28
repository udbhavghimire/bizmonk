import { Suspense } from "react";
import citiesData from "@/data/gta-cities.json";
import { notFound } from "next/navigation";
import {
  fetchProperties,
  getSaleOfBusinessListings,
} from "@/api/getBusinessListings";
import { fetchMedia } from "@/api/getImageUrls";
import ClientPage from "./ClientPage";
import Link from "next/link";
import { cities } from "@/constant/cities";
import CityContent from "@/data/CityContent";
import { getCategoryFromSlug } from "@/constant/categories";

// Helper function to convert city names to URL-friendly format
const toUrlFormat = (cityName) => cityName.toLowerCase().replace(/\s+/g, "-");

// Helper function to find city by URL format
const findCityByUrlFormat = (urlFormat) => {
  return citiesData.cities.find(
    (city) => toUrlFormat(city) === urlFormat.toLowerCase(),
  );
};

// Add metadata export
export async function generateMetadata({ params }) {
  const { city } = await params;
  const categoryName = getCategoryFromSlug(city);
  const cityName = findCityByUrlFormat(city);

  if (!cityName && !categoryName) {
    return {
      title: "Business Opportunities - Bizmonk",
      description: "Find business opportunities across Ontario",
    };
  }

  if (categoryName) {
    const formattedCategory = city.replace(/-for-sale$/i, '').replace(/-lease$/i, '').replace(/-/g, ' ');
    const displayCategory = formattedCategory.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return {
      title: `${displayCategory} Businesses for Sale in Ontario - Bizmonk`,
      description: `Browse ${displayCategory.toLowerCase()} business opportunities for sale across Ontario.`,
      openGraph: {
        title: `${displayCategory} Businesses for Sale in Ontario - Bizmonk`,
        description: `Browse ${displayCategory.toLowerCase()} business opportunities for sale across Ontario.`,
      },
    };
  }

  return {
    title: `Business Opportunities in ${cityName}`,
    description: `${cityName} businesses for sale. Book a showing for gas stations, restaurants, motels, convenience stores and lands. Prices from $1 to $5,000,000. Open houses available.`,
    openGraph: {
      title: `Business Opportunities in ${cityName}`,
      description: `${cityName} businesses for sale. Book a showing for gas stations, restaurants, motels, convenience stores and lands. Prices from $1 to $5,000,000. Open houses available.`,
    },
  };
}

async function getCityData(city, searchParams) {
  const categoryName = getCategoryFromSlug(city);
  const cityExists = findCityByUrlFormat(city);
  if (!cityExists && !categoryName) return null;

  try {
    const currentPage = Number(searchParams?.page) || 1;
    const limit = 20;
    const skip = (currentPage - 1) * limit;
    const businessType = searchParams?.businessType || undefined;
    const sort = searchParams?.sort || "newest";
    const minPrice = searchParams?.minPrice
      ? Number(searchParams.minPrice)
      : undefined;
    const maxPrice = searchParams?.maxPrice
      ? Number(searchParams.maxPrice)
      : searchParams?.priceMax
        ? Number(searchParams.priceMax)
        : undefined;

    const queryCity = cityExists ? cityExists : null;
    const queryBusinessType = categoryName ? categoryName : businessType;

    const data = await fetchProperties({
      city: queryCity,
      top: limit,
      skip,
      minPrice,
      maxPrice,
      businessType: queryBusinessType,
      sort,
    });

    const listings = await Promise.all(
      (data.items || []).map(async (property) => {
        const media = await fetchMedia(property.ListingKey, 1);
        return { ...property, Media: media };
      }),
    );

    return {
      cityName: cityExists || "Ontario",
      isCategoryRoute: !!categoryName,
      listings,
      pagination: {
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalCount: data.totalCount,
      },
    };
  } catch (error) {
    console.error("Error fetching listings:", error);
    return {
      cityName: cityExists || "Ontario",
      isCategoryRoute: !!categoryName,
      listings: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalCount: 0,
      },
    };
  }
}

export default async function Page({ params, searchParams }) {
  const { city } = await params;
  const resolvedSearchParams = await searchParams;
  const data = await getCityData(city, resolvedSearchParams);

  if (!data) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
      <ClientPage
        listings={data.listings}
        cityName={data.cityName}
        pagination={data.pagination}
        categorySlug={data.isCategoryRoute ? city : undefined}
      />

      {/* Cities Section */}
      {!data.isCategoryRoute && (
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
              <img
                src={city.image}
                alt={`${city.name} cityscape`}
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
      )}

      {/* New SEO Content Section */}
      {!data.isCategoryRoute && <CityContent cityName={data.cityName} />}
    </Suspense>
  );
}
