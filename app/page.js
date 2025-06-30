import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import Newsletter from "@/components/Newsletter";
import TextWithContactButton from "@/components/TextWithContactButton";
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
  const convenienceStoreListings = await getConvenienceStoreListings({
    numberOfListings: 4,
  });
  const restaurantListings = await getRestaurantListings({
    numberOfListings: 4,
  });
  const officeListings = await getOfficeListings({
    numberOfListings: 4,
  });

  // Fetch data for HomepageListing component
  const bramptonRestaurants = await getBramptonRestaurantsUnder300k();
  const bramptonStores = await getBramptonStoresUnder500k();
  const torontoCommercial = await getTorontoCommercialSpace();

  return (
    <>
      <div className="min-h-screen gradient-bg parallax-bg relative">
        {/* Floating Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white bg-opacity-10 rounded-full floating-animation"></div>
          <div className="absolute top-40 right-20 w-20 h-20 bg-purple-300 bg-opacity-20 rounded-lg rotate-45 floating-animation-delayed"></div>
          <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-blue-300 bg-opacity-30 rounded-full floating-animation"></div>
          <div className="absolute top-60 left-1/2 w-24 h-24 bg-pink-300 bg-opacity-15 rotate-12 floating-animation-delayed"></div>
          <div className="absolute bottom-20 right-1/4 w-28 h-28 bg-indigo-300 bg-opacity-20 rounded-lg floating-animation"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 pt-20 pb-32">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black mb-8 fade-in-up">
              Never too late to{" "}
              <span className="text-gradient">start your business</span>
            </h1>

            <p className="text-sm md:text-xl text-black text-opacity-90 mb-12 max-w-4xl mx-auto leading-relaxed fade-in-up-delayed">
              Restaurants, Convenience Store, Franchise and Commercial Space in
              Ontario
            </p>
            <div className="mt-16 max-w-4xl mx-auto">
              <SearchBar variant="hero" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white border-opacity-50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white bg-opacity-70 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-white">
        {/* Enhanced Hero Section */}

        {/* Introduction to BizMonk */}

        {/* Franchise Opportunities Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-gray-50">
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

          <div className="text-center mt-6 sm:mt-8">
            <Link
              href="/franchise-opportunity/ontario"
              className="inline-flex items-center gap-2 text-sm sm:text-base text-blue-600  hover:underline transition-colors font-bold"
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
                <div className="mt-4 flex flex-col space-y-2 px-4">
                  <Link
                    href="/brampton/restaurant-for-sale"
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    Brampton Restaurants for Sale
                  </Link>
                  <Link
                    href="/mississauga/restaurant-for-sale"
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    Mississauga Restaurants for Sale
                  </Link>
                  <Link
                    href="/toronto/restaurant-for-sale"
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    Toronto Restaurants for Sale
                  </Link>
                  <Link
                    href="/vaughan/restaurant-for-sale"
                    className="text-sm text-gray-600 hover:text-primary"
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
                <div className="mt-4 flex flex-col space-y-2 px-4">
                  <Link
                    href="/franchise-opportunity/brampton"
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    Brampton Franchises
                  </Link>
                  <Link
                    href="/franchise-opportunity/mississauga"
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    Mississauga Franchises
                  </Link>
                  <Link
                    href="/franchise-opportunity/toronto"
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    Toronto Franchises
                  </Link>
                  <Link
                    href="/franchise-opportunity/vaughan"
                    className="text-sm text-gray-600 hover:text-primary"
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
                <div className="mt-4 flex flex-col space-y-2 px-4">
                  <Link
                    href="/brampton/convenience-store-for-sale"
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    Brampton Convenience Stores
                  </Link>
                  <Link
                    href="/mississauga/convenience-store-for-sale"
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    Mississauga Convenience Stores
                  </Link>
                  <Link
                    href="/toronto/convenience-store-for-sale"
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    Toronto Convenience Stores
                  </Link>
                  <Link
                    href="/vaughan/convenience-store-for-sale"
                    className="text-sm text-gray-600 hover:text-primary"
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
                <div className="mt-4 flex flex-col space-y-2 px-4">
                  <Link
                    href="/brampton/retail-lease"
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    Brampton Retail Lease
                  </Link>
                  <Link
                    href="/mississauga/retail-lease"
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    Mississauga Retail Lease
                  </Link>
                  <Link
                    href="/toronto/retail-lease"
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    Toronto Retail Lease
                  </Link>
                  <Link
                    href="/vaughan/retail-lease"
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    Vaughan Retail Lease
                  </Link>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <Link
                href="commercial/ontario"
                className="text-blue-600 hover:text-primary/80 font-semibold text-lg"
              >
                View All Commercial Properties in Ontario →
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
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
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
