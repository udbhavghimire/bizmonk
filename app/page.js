import Link from "next/link";
import Newsletter from "@/components/Newsletter";
import PropertyDisplaySection from "@/components/PropertyDisplaySection";
import Slider from "@/components/Slider";
import HomepageListing from "@/components/HomepageListing.jsx";
import FeaturedFranchises from "@/components/FeaturedFranchises";
import {
  getConvenienceStoreListings,
  getOfficeListings,
  getRestaurantListings,
  getBramptonRestaurantsUnder300k,
  getBramptonStoresUnder500k,
  getTorontoCommercialSpace,
} from "@/api/getBusinessListings";
import { cities } from "@/constant/cities";
import FranchisesList from "@/components/FranchisesList";

export default async function Home() {
  const [
    convenienceStoreListings,
    restaurantListings,
    officeListings,
    bramptonRestaurants,
    bramptonStores,
    torontoCommercial,
  ] = await Promise.all([
    getConvenienceStoreListings({ numberOfListings: 4 }),
    getRestaurantListings({ numberOfListings: 4 }),
    getOfficeListings({ numberOfListings: 4 }),
    getBramptonRestaurantsUnder300k(),
    getBramptonStoresUnder500k(),
    getTorontoCommercialSpace(),
  ]);

  return (
    <>
      {/* ChatGPT-Style Black Hero Section */}
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Subtle ChatGPT-style background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Minimal floating orbs */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-gray-800/20 to-gray-700/20 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-gray-700/15 to-gray-600/15 rounded-full blur-2xl"></div>
          <div className="absolute bottom-40 left-1/4 w-32 h-32 bg-gradient-to-br from-gray-600/10 to-gray-500/10 rounded-full blur-xl"></div>
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Heading */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Canada's One of Leading
                <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  AI Powered Business Platform
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                Discover restaurants, franchises, convenience stores, and
                commercial spaces across Ontario with our intelligent AI-powered
                matching system. Your next business venture starts here.
              </p>
            </div>

            {/* AI-Powered Search Interface */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="relative">
                {/* Main Search Container */}
                <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 p-8 relative overflow-hidden">
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 via-gray-700/20 to-gray-800/20 rounded-2xl"></div>

                  <div className="relative z-10 flex flex-col space-y-6">
                    {/* Search Input */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                        <svg
                          className="h-6 w-6 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Tell us what kind of business you're looking for..."
                        className="w-full pl-16 pr-6 py-5 text-lg bg-gray-800/50 border-2 border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-500/30 transition-all duration-300 outline-none"
                      />
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        <button className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 shadow-lg">
                          Search
                        </button>
                      </div>
                    </div>

                    {/* Quick Filters */}
                    <div className="flex flex-wrap gap-3 justify-center">
                      <button className="px-5 py-2.5 bg-gray-800/60 border border-gray-600/50 rounded-full text-sm font-medium text-gray-300 hover:bg-gray-700/60 hover:border-gray-500/50 hover:text-white transition-all duration-200">
                        🍽️ Restaurants
                      </button>
                      <button className="px-5 py-2.5 bg-gray-800/60 border border-gray-600/50 rounded-full text-sm font-medium text-gray-300 hover:bg-gray-700/60 hover:border-gray-500/50 hover:text-white transition-all duration-200">
                        🏢 Franchises
                      </button>
                      <button className="px-5 py-2.5 bg-gray-800/60 border border-gray-600/50 rounded-full text-sm font-medium text-gray-300 hover:bg-gray-700/60 hover:border-gray-500/50 hover:text-white transition-all duration-200">
                        🏪 Convenience Stores
                      </button>
                      <button className="px-5 py-2.5 bg-gray-800/60 border border-gray-600/50 rounded-full text-sm font-medium text-gray-300 hover:bg-gray-700/60 hover:border-gray-500/50 hover:text-white transition-all duration-200">
                        🏬 Retail Lease
                      </button>
                    </div>
                  </div>
                </div>

                {/* Popular Searches */}
                {/* <div className="mt-6 text-center">
                  <p className="text-sm text-gray-400 mb-3">
                    Popular searches:
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-3 py-1 bg-gray-700/50 text-gray-300 border border-gray-600/50 rounded-full text-sm cursor-pointer hover:bg-gray-600/50 hover:border-gray-500/50 transition-all duration-200">
                      Toronto restaurants
                    </span>
                    <span className="px-3 py-1 bg-gray-700/50 text-gray-300 border border-gray-600/50 rounded-full text-sm cursor-pointer hover:bg-gray-600/50 hover:border-gray-500/50 transition-all duration-200">
                      Brampton franchises
                    </span>
                    <span className="px-3 py-1 bg-gray-700/50 text-gray-300 border border-gray-600/50 rounded-full text-sm cursor-pointer hover:bg-gray-600/50 hover:border-gray-500/50 transition-all duration-200">
                      Mississauga retail
                    </span>
                    <span className="px-3 py-1 bg-gray-700/50 text-gray-300 border border-gray-600/50 rounded-full text-sm cursor-pointer hover:bg-gray-600/50 hover:border-gray-500/50 transition-all duration-200">
                      Convenience stores under $500k
                    </span>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-800/30 rounded-full border border-gray-700/30">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300 font-medium">
                  1000+ Active Listings
                </span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-800/30 rounded-full border border-gray-700/30">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300 font-medium">
                  AI-Verified Properties
                </span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-800/30 rounded-full border border-gray-700/30">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300 font-medium">
                  24/7 AI Support
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-white">
        {/* Enhanced Hero Section */}

        {/* Introduction to BizMonk */}

        {/* Franchise Opportunities Section */}
        <div className="md:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-8 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-2 px-4">
              Looking for{" "}
              <span className="text-primary">Franchise Opportunities?</span>
            </h2>
            <p className="text-base sm:text-lg text-black max-w-2xl mx-auto px-4 ">
              Explore premium franchise opportunities across Ontario and find
              the perfect business venture
            </p>
          </div>

          {/* Featured Franchises */}
          <FeaturedFranchises />

            <div className="text-center mt-6 sm:mt-8 w-full flex justify-center">
              <Link
                href="/franchise-opportunity/ontario"
                className="block text-center px-6 py-3 bg-black text-white rounded-full hover:bg-primary/90 transition-colors font-medium text-nowrap max-w-lg inline-flex items-center gap-2 text-sm sm:text-base font-bold"
              >
                View All Franchises in Ontario
              </Link>
            </div>
          {/* FranchisesList component here */}
          <FranchisesList />

          {/* Top Categories Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="md:text-[42px] text-3xl font-extrabold text-gray-900 mb-8 text-center">
              Looking to own a business?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Restaurant Card */}
              <div className="flex flex-col">
                <Link
                  href="/restaurant-for-sale"
                  className="group relative rounded-xl overflow-hidden"
                >
                  <div className="relative h-64">
                    <img
                      src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
                      alt="Restaurant for Sale"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-[18px] font-bold text-white">
                        Restaurants for Sale
                      </h3>
                    </div>
                  </div>
                </Link>
                <div className="mt-4 flex flex-col space-y-2 px-1">
                  <Link
                    href="/brampton/restaurant-for-sale"
                    className="text-xs text-gray-600 hover:text-primary"
                  >
                    Brampton Restaurants for Sale
                  </Link>
                  <Link
                    href="/mississauga/restaurant-for-sale"
                    className="text-xs text-gray-600 hover:text-primary"
                  >
                    Mississauga Restaurants for Sale
                  </Link>
                  <Link
                    href="/toronto/restaurant-for-sale"
                    className="text-xs text-gray-600 hover:text-primary"
                  >
                    Toronto Restaurants for Sale
                  </Link>
                  <Link
                    href="/vaughan/restaurant-for-sale"
                    className="text-xs text-gray-600 hover:text-primary"
                  >
                    Vaughan Restaurants for Sale
                  </Link>
                </div>
              </div>

              {/* Franchises Card */}
              <div className="flex flex-col">
                <Link
                  href="/franchise-opportunity/ontario"
                  className="group relative rounded-xl overflow-hidden"
                >
                  <div className="relative h-64">
                    <img
                      src="/fatbb.jpg"
                      alt="Franchises for Sale"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-[18px] font-bold text-white">
                        Franchises for Sale
                      </h3>
                    </div>
                  </div>
                </Link>
                <div className="mt-4 flex flex-col space-y-2 px-1">
                  <Link
                    href="/franchise-opportunity/brampton"
                    className="text-xs text-gray-600 hover:text-primary"
                  >
                    Brampton Franchises
                  </Link>
                  <Link
                    href="/franchise-opportunity/mississauga"
                    className="text-xs text-gray-600 hover:text-primary"
                  >
                    Mississauga Franchises
                  </Link>
                  <Link
                    href="/franchise-opportunity/toronto"
                    className="text-xs text-gray-600 hover:text-primary"
                  >
                    Toronto Franchises
                  </Link>
                  <Link
                    href="/franchise-opportunity/vaughan"
                    className="text-xs text-gray-600 hover:text-primary"
                  >
                    Vaughan Franchises
                  </Link>
                </div>
              </div>

              {/* Convenience Store Card */}
              <div className="flex flex-col">
                <Link
                  href="/convenience-store-for-sale"
                  className="group relative rounded-xl overflow-hidden"
                >
                  <div className="relative h-64">
                    <img
                      src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a"
                      alt="Convenience Stores for Sale"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-[18px] font-bold text-white">
                        Convenience Stores for Sale
                      </h3>
                    </div>
                  </div>
                </Link>
                <div className="mt-4 flex flex-col space-y-2 px-1">
                  <Link
                    href="/brampton/convenience-store-for-sale"
                    className="text-xs text-gray-600 hover:text-primary"
                  >
                    Brampton Convenience Stores
                  </Link>
                  <Link
                    href="/mississauga/convenience-store-for-sale"
                    className="text-xs text-gray-600 hover:text-primary"
                  >
                    Mississauga Convenience Stores
                  </Link>
                  <Link
                    href="/toronto/convenience-store-for-sale"
                    className="text-xs text-gray-600 hover:text-primary"
                  >
                    Toronto Convenience Stores
                  </Link>
                  <Link
                    href="/vaughan/convenience-store-for-sale"
                    className="text-xs text-gray-600 hover:text-primary"
                  >
                    Vaughan Convenience Stores
                  </Link>
                </div>
              </div>

              {/* Offices Card */}
              <div className="flex flex-col">
                <Link
                  href="/retail-lease"
                  className="group relative rounded-xl overflow-hidden"
                >
                  <div className="relative h-64">
                    <img
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c"
                      alt="Retail Lease"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-[18px] font-bold text-white">
                        Retail Lease
                      </h3>
                    </div>
                  </div>
                </Link>
                <div className="mt-4 flex flex-col space-y-2 px-1">
                  <Link
                    href="/brampton/retail-lease"
                    className="text-xs text-gray-600 hover:text-primary"
                  >
                    Brampton Retail Lease
                  </Link>
                  <Link
                    href="/mississauga/retail-lease"
                    className="text-xs text-gray-600 hover:text-primary"
                  >
                    Mississauga Retail Lease
                  </Link>
                  <Link
                    href="/toronto/retail-lease"
                    className="text-xs text-gray-600 hover:text-primary"
                  >
                    Toronto Retail Lease
                  </Link>
                  <Link
                    href="/vaughan/retail-lease"
                    className="text-xs text-gray-600 hover:text-primary"
                  >
                    Vaughan Retail Lease
                  </Link>
                </div>
              </div>
            </div>
            <div className="text-center mt-12 w-full flex justify-center">
              <Link
                href="/commercial/ontario"
                className="block text-center px-6 py-3 bg-black text-white rounded-full hover:bg-primary/90 transition-colors font-medium text-nowrap max-w-lg"
              >
                View All Commercial Properties in Ontario
              </Link>
            </div>
          </div>

          {/* Explore by Location */}
          {/* <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-sm mx-2 sm:mx-0">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-3">
              Explore Franchises by Location
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
              {[
                "Ontario",
                "Toronto",
                "Mississauga",
                "Brampton",
                "Vaughan",
                "Markham",
                "Richmond Hill",
                "Oakville",
                "Ajax",
                "Pickering",
                "Milton",
                "Burlington",
              ].map((city) => (
                <Link
                  key={city}
                  href={`/franchise-opportunity/${city
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                  className="px-3 sm:px-4 py-2 sm:py-3 text-center rounded-lg bg-gray-50 hover:bg-primary/5 transition-colors group"
                >
                  <span className="text-xs sm:text-sm font-medium text-gray-900 group-hover:text-primary">
                    {city}
                  </span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6 sm:mt-8">
              <Link
                href="/franchise-opportunity/ontario"
                className="inline-flex items-center gap-2 text-sm sm:text-base text-blue-600  hover:underline transition-colors font-bold"
              >
                View All Locations
              </Link>
            </div>
          </div> */}
        </div>

        <HomepageListing
          bramptonRestaurants={bramptonRestaurants}
          bramptonStores={bramptonStores}
          torontoCommercial={torontoCommercial}
        />

        {/* <TextWithContactButton
        title="Are you looking to start a business?"
        subtitle="Not sure where to start?"
        textContent="Looking for the perfect space to launch or grow your business? BizMonk specializes in providing premium real estate solutions tailored to meet your unique needs. Whether you're starting fresh or expanding your operations, we have the ideal commercial spaces to set your business up for success. Contact us today to find the right space and take the first step towards your business goals!"
        imgSrc="/contact-img/person.png"
      /> */}

        {/* Cities Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Business Properties for sale in your city
            </h2>
            <p className="text-lg text-gray-600">
              Explore top cities across Canada
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.map((city) => (
              <Link
                key={city.name}
                href={`/${city.name.toLowerCase()}`}
                className="group relative rounded-lg overflow-hidden aspect-[4/3]"
              >
                <img
                  src={city.image}
                  alt={`${city.name} cityscape`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                  {city.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        <PropertyDisplaySection
          title="Latest Convenience Store Listings"
          subtitle="Discover turnkey convenience store opportunities in prime locations"
          exploreAllLink="/convenience-store-for-sale"
        >
          <Slider data={convenienceStoreListings} />
        </PropertyDisplaySection>
        {/* Category Section */}

        <PropertyDisplaySection
          title="Featured Restaurant Listings"
          subtitle="Explore profitable restaurant businesses ready for new ownership"
          exploreAllLink="/restaurant-for-sale"
        >
          <Slider data={restaurantListings} />
        </PropertyDisplaySection>

        <div
          id="categories"
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Browse by Category
          </h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/restaurant-for-sale"
              className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64">
                <img
                  src="/restaurant.webp"
                  alt="Restaurant interior"
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white">
                    Restaurants for Sale
                  </h3>
                  <p className="mt-2 text-sm text-gray-200">
                    Browse available restaurant spaces and turnkey operations
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/convenience-store-for-sale"
              className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64">
                <img
                  src="/store.jpg"
                  alt="Convenience store"
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white">
                    Convenience Stores for Sale
                  </h3>
                  <p className="mt-2 text-sm text-gray-200">
                    Explore convenience store opportunities
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/retail-lease"
              className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64">
                <img
                  src="/office.jpeg"
                  alt="Modern Retail Lease"
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white">
                    Retail Lease
                  </h3>
                  <p className="mt-2 text-sm text-gray-200">
                    Find the perfect Retail Lease for your business
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="text-center mt-8 flex w-full justify-center">
            <Link
              href="/restaurant-for-sale"
              className="block text-center px-6 py-3 bg-black text-white rounded-full hover:bg-primary/90 transition-colors font-medium text-nowrap max-w-lg"
            >
              View Restaurant Listings
            </Link>
          </div>
        </div>

        <PropertyDisplaySection
          title="Premium Retail Leases"
          subtitle="Find the perfect Retail Lease for your business growth"
          exploreAllLink="/retail-lease"
        >
          <Slider data={officeListings} />
        </PropertyDisplaySection>

        <Newsletter />
      </div>
    </>
  );
}
