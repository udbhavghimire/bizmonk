import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import Newsletter from "@/components/Newsletter";
import TextWithContactButton from "@/components/TextWithContactButton";
import PropertyDisplaySection from "@/components/PropertyDisplaySection";
import Slider from "@/components/Slider";
import { getConvenienceStoreListings } from "@/api/getBusinessListings";

export default async function Home() {
  const convenienceStoreListings = await getConvenienceStoreListings({
    numberOfListings: 4,
  });
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-pink-50 opacity-70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="text-center">
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-500 sm:text-7xl md:text-8xl tracking-tight mb-6">
              Bizmonk
            </h1>
            <p className="text-7xl font-black text-gray-900 tracking-tight mb-8">
              Find your business space
            </p>
            <p className="mt-8 text-2xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
              Discover premium business opportunities across the Greater Toronto
              Area
            </p>
            <div className="mt-10 max-w-2xl mx-auto">
              <SearchBar />
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-0 w-40 h-40 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
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
            <span className="text-bold text-transparent bg-clip-text  bg-gradient-to-r from-blue-600 to-pink-500">
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
      <TextWithContactButton
        textContent="Looking to invest in a franchise and become your own boss? Our
          platform connects you with the best franchise opportunities across
          various industries, from food and retail to services and beyond.
          Whether you're a seasoned entrepreneur or just starting your journey,
          we provide detailed insights and expert guidance to help you make the
          right choice. Start building your future today!"
        imgSrc={"/contact-img/franchise.png"}
        title="FRANCHISE OPPORTUNITIES"
        subtitle="Are you looking for a Franchise?"
      />
      {/* Category Section */}
      <PropertyDisplaySection
        title="Check out these latest convenience store listings"
        exploreAllLink="/convenience-store-for-sale"
      >
        <Slider data={convenienceStoreListings} />
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

      <Newsletter />
    </div>
  );
}
