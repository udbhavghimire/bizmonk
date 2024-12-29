import Image from "next/image";
import Link from "next/link";

export default function Home() {
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

            {/* CTA Buttons */}
            <div className="mt-12 flex justify-center gap-4">
              <Link
                href="/restaurant-for-sale"
                className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Browse Listings
              </Link>
              <Link
                href="#categories"
                className="px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl border border-blue-100"
              >
                View Categories
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-0 w-40 h-40 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Category Section */}
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
    </div>
  );
}
