import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import Newsletter from "@/components/Newsletter";
import TextWithContactButton from "@/components/TextWithContactButton";
import PropertyDisplaySection from "@/components/PropertyDisplaySection";
import Slider from "@/components/Slider";
import {
  getConvenienceStoreListings,
  getOfficeListings,
  getRestaurantListings,
} from "@/api/getBusinessListings";

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
  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden min-h-[90vh]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-2xl md:text-7xl font-black text-gray-900 tracking-tight max-w-5xl mx-auto leading-[1.1] mb-6">
              Your Gateway to Business
              <span className="block text-primary">Ownership in GTA</span>
            </h1>
            <p className="text-sm text-black max-w-xl mx-auto mb-10">
              Discover premium business opportunities, from turnkey operations
              to prime commercial spaces across Greater Toronto Area
            </p>

            <div className="mt-8 max-w-3xl mx-auto">
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
                  link: "/franchises",
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

      {/* Business Stats Section */}
      <div className="bg-white py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "1,500+", label: "Active Listings" },
              { number: "500+", label: "Successful Sales" },
              { number: "15+", label: "Years Experience" },
              { number: "98%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-primary">{stat.number}</p>
                <p className="text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TextWithContactButton
        title="Are you looking to start a business?"
        subtitle="Not sure where to start?"
        textContent="Looking for the perfect space to launch or grow your business? BizMonk specializes in providing premium real estate solutions tailored to meet your unique needs. Whether you're starting fresh or expanding your operations, we have the ideal commercial spaces to set your business up for success. Contact us today to find the right space and take the first step towards your business goals!"
        imgSrc="/contact-img/person.png"
      />
      {/* Cities Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Business Properties for sale in{" "}
            <span className="text-bold text-transparent bg-clip-text  bg-gradient-to-r from-primary to-secondary">
              your city
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            Explore top cities across Canada
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Toronto", image: "/toronto.jpg" },
            { name: "Ottawa", image: "/ottawa.jpg" },
            { name: "Mississauga", image: "/mississauga.jpg" },
            { name: "Ajax", image: "/ajax.jpg" },
            { name: "Barrie", image: "/barrie.jpg" },
            { name: "Brampton", image: "/brampton.jpg" },
            { name: "Pickering", image: "/pickering.jpg" },
            { name: "Hamilton", image: "/hamilton.jpg" },
          ].map((city) => (
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

      {/* Franchise Opportunities Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-gray-50">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            Looking for{" "}
            <span className="text-primary">Franchise Opportunities?</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Explore premium franchise opportunities across Ontario and find the
            perfect business venture
          </p>
        </div>

        {/* Featured Franchises */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-16 px-2 sm:px-0">
          <Link
            href="/franchise-opportunity/ontario/mary-browns-chicken"
            className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-48 sm:h-64">
              <Image
                src="/mary.jpg"
                alt="Mary Brown's Chicken"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
                  Mary Brown's Chicken
                </h3>
                <p className="text-xs sm:text-sm text-gray-200">
                  Investment: $450K - $700K
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/franchise-opportunity/ontario/fat-bastard-burrito"
            className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-48 sm:h-64">
              <Image
                src="/fatb.jpg"
                alt="Fat Bastard Burrito"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
                  Fat Bastard Burrito
                </h3>
                <p className="text-xs sm:text-sm text-gray-200">
                  Investment: $350K - $500K
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Explore by Location */}
        <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-sm mx-2 sm:mx-0">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">
            Explore Franchises by Location
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
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
                  .replace(" ", "-")}`}
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
              className="inline-flex items-center gap-2 text-sm sm:text-base text-primary hover:text-primary/80 transition-colors font-medium"
            >
              View All Locations
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-8 sm:mt-16 mx-2 sm:mx-0">
          {[
            { number: "2+", label: "Premium Franchises" },
            { number: "15+", label: "Available Locations" },
            { number: "95%", label: "Success Rate" },
            { number: "24/7", label: "Support & Training" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-sm"
            >
              <p className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                {stat.number}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
            </div>
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
            <Image
              src="/restaurant.webp"
              alt="Restaurant interior"
              width={600}
              height={400}
              className="object-cover h-64 w-full transform group-hover:scale-105 transition-transform duration-300"
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
          </Link>

          <Link
            href="/convenience-store-for-sale"
            className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src="/store.jpg"
              alt="Convenience store"
              width={600}
              height={400}
              className="object-cover h-64 w-full transform group-hover:scale-105 transition-transform duration-300"
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
          </Link>

          <Link
            href="/offices-for-lease"
            className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src="/office.jpeg"
              alt="Modern office space"
              width={600}
              height={400}
              className="object-cover h-64 w-full transform group-hover:scale-105 transition-transform duration-300"
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
