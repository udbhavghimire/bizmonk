import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import Newsletter from "@/components/Newsletter";
import TextWithContactButton from "@/components/TextWithContactButton";
import PropertyDisplaySection from "@/components/PropertyDisplaySection";
import Slider from "@/components/Slider";
import HomepageListing from "@/components/HomepageListing.jsx";
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
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden min-h-[90vh] bg-gradient-to-b from-[#EEF5FF] via-[#EEF5FF] to-white">
        {/* Curved background shape */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#EEF5FF]">
            <svg
              className="absolute bottom-0 w-full h-[20vh] text-white"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
              style={{ transform: "scale(1.1)" }}
            >
              <path
                fill="currentColor"
                fillOpacity="1"
                d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

        {/* Content */}
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-2xl md:text-[43px] font-black text-black tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6">
              Restaurants, Convenience Store, Franchise and Commercial Space in
              Ontario
            </h1>
            {/* <p className="text-sm text-gray-600 max-w-xl mx-auto mb-10">
              Discover premium business opportunities, from turnkey operations
              to prime commercial spaces across Greater Toronto Area
            </p> */}

            <div className="mt-8 max-w-4xl mx-auto">
              <SearchBar variant="hero" />
            </div>

            {/* Business Categories Quick Links */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                {
                  icon: "🏢",
                  title: "Offices",
                  link: "/offices-for-lease",
                  count: "250+",
                },
                {
                  icon: "🍽️",
                  title: "Restaurants",
                  link: "/restaurant-for-sale",
                  count: "180+",
                },
                {
                  icon: "🏪",
                  title: "Stores",
                  link: "/convenience-store-for-sale",
                  count: "120+",
                },
                {
                  icon: "🤝",
                  title: "Franchises",
                  link: "/franchise-opportunity/ontario",
                  count: "90+",
                },
              ].map((category) => (
                <Link
                  key={category.title}
                  href={category.link}
                  className="group p-4 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900">
                    {category.title}
                  </h3>
                  <p className="text-primary font-bold">{category.count}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Introduction to BizMonk */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Your Gateway to Business{" "}
              <span className="text-primary">Ownership</span> in Ontario
            </h2>
            <p className="text-lg text-gray-600">
              BizMonk is Ontario's premier platform connecting entrepreneurs
              with business opportunities. Whether you're looking to buy a
              restaurant, invest in a franchise, or lease commercial space,
              we're here to make your business dreams a reality.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-gray-600">Active Listings</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-gray-600">Partner Brands</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-primary">1000+</div>
                <div className="text-sm text-gray-600">Success Stories</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/Commercial-img.jpg"
              alt="Business Growth"
              className="relative rounded-2xl shadow-lg w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>

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
              href="/offices-for-lease"
              className="group relative rounded-xl overflow-hidden"
            >
              <div className="relative h-64">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c"
                  alt="Offices for Lease"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-[18px] font-bold text-white">
                    Offices for Lease
                  </h3>
                </div>
              </div>
            </Link>
            <div className="mt-4 flex flex-col space-y-2 px-4">
              <Link
                href="/brampton/offices-for-lease"
                className="text-sm text-gray-600 hover:text-primary"
              >
                Brampton Office Space
              </Link>
              <Link
                href="/mississauga/offices-for-lease"
                className="text-sm text-gray-600 hover:text-primary"
              >
                Mississauga Office Space
              </Link>
              <Link
                href="/toronto/offices-for-lease"
                className="text-sm text-gray-600 hover:text-primary"
              >
                Toronto Office Space
              </Link>
              <Link
                href="/vaughan/offices-for-lease"
                className="text-sm text-gray-600 hover:text-primary"
              >
                Vaughan Office Space
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

      {/* Franchise Opportunities Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-gray-50">
        <div className="text-center mb-8 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-2 px-4">
            Looking for{" "}
            <span className="text-primary">Franchise Opportunities?</span>
          </h2>
          <p className="text-base sm:text-lg text-black max-w-2xl mx-auto px-4 ">
            Explore premium franchise opportunities across Ontario and find the
            perfect business venture
          </p>
        </div>

        {/* Featured Franchises */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-4 sm:px-6">
          <Link
            href="/franchise-opportunity/ontario/mary-browns-chicken"
            className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-72">
              <img
                src="/marryb.webp"
                alt="Mary Brown's Chicken"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 ">
                Mary Brown's Chicken
              </h3>
              <p className="text-lg text-gray-700">Investment: $450K - $700K</p>
            </div>
          </Link>

          <Link
            href="/franchise-opportunity/ontario/fat-bastard-burrito"
            className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-72">
              <img
                src="/fatbb.jpg"
                alt="Fat Bastard Burrito"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 ">
                Fat Bastard Burrito
              </h3>
              <p className="text-lg text-gray-700">Investment: $350K - $500K</p>
            </div>
          </Link>

          <Link
            href="/franchise-opportunity/ontario/wingsup"
            className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-72">
              <img
                src="/franchises/wingsup.jpg"
                alt="Wingsup"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 ">Wingsup!</h3>
              <p className="text-lg text-gray-700">Investment: $400K - $480K</p>
            </div>
          </Link>
        </div>

        {/* FranchisesList component here */}
        <FranchisesList />

        {/* Explore by Location */}
        <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-sm mx-2 sm:mx-0">
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
        </div>
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
            href="/offices-for-lease"
            className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-64">
              <img
                src="/office.jpeg"
                alt="Modern office space"
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-semibold text-white">
                  Offices for Lease
                </h3>
                <p className="mt-2 text-sm text-gray-200">
                  Find the perfect office space for your business
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <PropertyDisplaySection
        title="Premium Office Spaces"
        subtitle="Find the perfect office space for your business growth"
        exploreAllLink="/offices-for-lease"
      >
        <Slider data={officeListings} />
      </PropertyDisplaySection>

      <Newsletter />
    </div>
  );
}
