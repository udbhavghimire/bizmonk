import Link from "next/link";
import { Suspense } from "react";
import Newsletter from "@/components/Newsletter";
import PropertyDisplaySection from "@/components/PropertyDisplaySection";
import Slider from "@/components/Slider";
import HomepageListing from "@/components/HomepageListing.jsx";
import FeaturedFranchises from "@/components/FeaturedFranchises";
import { fetchProperties } from "@/api/getBusinessListings";
import { fetchMedia } from "@/api/getImageUrls";
import { cities } from "@/constant/cities";
import FranchisesList from "@/components/FranchisesList";
import ListingSkeleton from "@/components/ListingSkeleton";
import SearchBar from "@/components/SearchBar";

export const revalidate = 3600; // Revalidate every 1 hour

const attachMediaToListings = async (listings = [], mediaCount = 1) => {
  return Promise.all(
    (listings || []).map(async (property) => {
      try {
        const media = await fetchMedia(property.ListingKey, mediaCount);
        return { ...property, Media: media };
      } catch (error) {
        console.error(
          "Error fetching media for listing:",
          property.ListingKey,
          error,
        );
        return { ...property, Media: [] };
      }
    }),
  );
};

const fetchHomeListings = async (params) => {
  const response = await fetchProperties(params);
  return attachMediaToListings(response?.items || [], 1);
};

async function ConvenienceStoresSection() {
  const listings = await fetchHomeListings({
    top: 4,
    skip: 0,
    businessType: "convenience-store",
    sort: "newest",
  });
  return (
    <PropertyDisplaySection
      title="Latest Convenience Store Listings"
      subtitle="Discover turnkey convenience store opportunities in prime locations"
      exploreAllLink="/toronto?businessType=convenience-store"
    >
      <Slider data={listings} />
    </PropertyDisplaySection>
  );
}

async function RestaurantsSection() {
  const listings = await fetchHomeListings({
    top: 4,
    skip: 0,
    businessType: "restaurant",
    sort: "newest",
  });
  return (
    <PropertyDisplaySection
      title="Featured Restaurant Listings"
      subtitle="Explore profitable restaurant businesses ready for new ownership"
      exploreAllLink="/toronto?businessType=restaurant"
    >
      <Slider data={listings} />
    </PropertyDisplaySection>
  );
}

async function RegionalListingsSection() {
  const [bramptonRestaurants, torontoCommercial] = await Promise.all([
    fetchHomeListings({
      city: "Brampton",
      top: 8,
      skip: 0,
      businessType: "restaurant",
      maxPrice: 300000,
      sort: "newest",
    }),
    fetchHomeListings({
      city: "Toronto",
      top: 8,
      skip: 0,
      businessType: "professional-office",
      sort: "newest",
    }),
  ]);
  return (
    <HomepageListing
      bramptonRestaurants={bramptonRestaurants}
      torontoCommercial={torontoCommercial}
    />
  );
}

export default function Home() {
  return (
    <>
      {/* Minimalist Hero Section */}
      <div className="relative pt-32 pb-24 bg-white border-b border-gray-100 overflow-hidden">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-black">
          <div className="flex justify-center mb-6">
            <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-full border border-blue-100">
              Verified Business Opportunities
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
            The Future of Investment
          </h1>
          
          <p className="text-base md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover verified opportunities across Ontario's most profitable 
            districts with Canada's leading marketplace.
          </p>

          {/* Clean Rounded-Full Search Bar */}
          <div className="max-w-xl mx-auto">
            <SearchBar variant="hero" />
          </div>

          {/* Minimal Trust Indicators */}
          <div className="flex justify-center flex-wrap items-center gap-8 mt-16 pb-10">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-gray-900">1.2K+</span>
              <span className="text-sm text-gray-500 font-medium mt-1">Listings</span>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-gray-900">Ontario</span>
              <span className="text-sm text-gray-500 font-medium mt-1">Active Market</span>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-gray-900">$500M+</span>
              <span className="text-sm text-gray-500 font-medium mt-1">Trade Volume</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        {/* Franchise Opportunities Section */}
        <div className="md:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 px-4">
              Explore <span className="text-primary text-nowrap">Franchise Opportunities</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto px-4 leading-relaxed">
              Discover verified premium franchise brands and find the perfect
              business venture across Ontario.
            </p>
          </div>

          <FeaturedFranchises />

          <div className="text-center mt-12 w-full flex justify-center">
            <Link
              href="/franchise-opportunity/ontario"
              className="inline-flex items-center justify-center px-10 py-4 bg-black text-white rounded-full font-bold hover:bg-primary/90 transition-all shadow-xl hover:-translate-y-1"
            >
              View All Franchises in Ontario
            </Link>
          </div>

          <FranchisesList />

          {/* Top Categories Section */}
          <div className="max-w-7xl mx-auto px-0 py-24">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
              Target Your Next Venture
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Restaurant Card */}
              <div className="flex flex-col group">
                <Link
                  href="/restaurant-for-sale"
                  className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg"
                >
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
                    alt="Restaurant for Sale"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl font-bold text-white">
                      Restaurants
                    </h3>
                  </div>
                </Link>
                <div className="mt-6 flex flex-col space-y-3 px-2">
                  <Link href="/brampton/restaurant-for-sale" className="text-sm text-gray-500 hover:text-primary transition-colors">Brampton</Link>
                  <Link href="/mississauga/restaurant-for-sale" className="text-sm text-gray-500 hover:text-primary transition-colors">Mississauga</Link>
                  <Link href="/toronto/restaurant-for-sale" className="text-sm text-gray-500 hover:text-primary transition-colors">Toronto</Link>
                </div>
              </div>

              {/* Franchises Card */}
              <div className="flex flex-col group">
                <Link
                  href="/franchise-opportunity/ontario"
                  className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg"
                >
                  <img
                    src="/fatbb.jpg"
                    alt="Franchises for Sale"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl font-bold text-white">
                      Franchises
                    </h3>
                  </div>
                </Link>
                <div className="mt-6 flex flex-col space-y-3 px-2">
                  <Link href="/franchise-opportunity/brampton" className="text-sm text-gray-500 hover:text-primary transition-colors">Brampton</Link>
                  <Link href="/franchise-opportunity/toronto" className="text-sm text-gray-500 hover:text-primary transition-colors">Toronto</Link>
                  <Link href="/franchise-opportunity/vaughan" className="text-sm text-gray-500 hover:text-primary transition-colors">Vaughan</Link>
                </div>
              </div>

              {/* Convenience Store Card */}
              <div className="flex flex-col group">
                <Link
                  href="/convenience-store-for-sale"
                  className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg"
                >
                  <img
                    src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a"
                    alt="Convenience Stores"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl font-bold text-white">
                      Convenience Stores
                    </h3>
                  </div>
                </Link>
                <div className="mt-6 flex flex-col space-y-3 px-2">
                  <Link href="/brampton/convenience-store-for-sale" className="text-sm text-gray-500 hover:text-primary transition-colors">Brampton</Link>
                  <Link href="/toronto/convenience-store-for-sale" className="text-sm text-gray-500 hover:text-primary transition-colors">Toronto</Link>
                  <Link href="/vaughan/convenience-store-for-sale" className="text-sm text-gray-500 hover:text-primary transition-colors">Vaughan</Link>
                </div>
              </div>

              {/* Retail Lease Card */}
              <div className="flex flex-col group">
                <Link
                  href="/retail-lease"
                  className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg"
                >
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c"
                    alt="Retail Lease"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl font-bold text-white">
                      Retail Lease
                    </h3>
                  </div>
                </Link>
                <div className="mt-6 flex flex-col space-y-3 px-2">
                  <Link href="/brampton/retail-lease" className="text-sm text-gray-500 hover:text-primary transition-colors">Brampton</Link>
                  <Link href="/toronto/retail-lease" className="text-sm text-gray-500 hover:text-primary transition-colors">Toronto</Link>
                  <Link href="/mississauga/retail-lease" className="text-sm text-gray-500 hover:text-primary transition-colors">Mississauga</Link>
                </div>
              </div>
            </div>
            <div className="text-center mt-16 w-full flex justify-center">
              <Link
                href="/commercial/ontario"
                className="inline-flex items-center justify-center px-10 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-black transition-all shadow-xl"
              >
                Explore All Opportunities in Ontario
              </Link>
            </div>
          </div>
        </div>

        {/* Async Fetched Sections with Suspense */}
        <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-24"><ListingSkeleton /></div>}>
          <RegionalListingsSection />
        </Suspense>

        {/* Cities Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Prime Locations in Canada
            </h2>
            <p className="text-lg text-gray-600">
              Browse the best investment properties across major economic hubs
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {cities.map((city) => (
              <Link
                key={city.name}
                href={`/${city.name.toLowerCase()}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg shadow-gray-200/50"
              >
                <img
                  src={city.image}
                  alt={`${city.name} cityscape`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white">
                  {city.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-24"><ListingSkeleton /></div>}>
          <ConvenienceStoresSection />
        </Suspense>

        <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-24"><ListingSkeleton /></div>}>
          <RestaurantsSection />
        </Suspense>

        <Newsletter />
      </div>
    </>
  );
}
