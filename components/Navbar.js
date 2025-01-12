import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img
                src="/bizmonk-logo.svg"
                alt="Bizmonk"
                className="h-14 w-auto"
              />
            </Link>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          <div className="hidden sm:flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm"
            >
              Exclusive Listings
            </Link>
            <Link
              href="/restaurant-for-sale"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm"
            >
              Restaurants
            </Link>
            <Link
              href="/convenience-store-for-sale"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm"
            >
              Convenience Stores
            </Link>
            <Link
              href="/offices-for-lease"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm"
            >
              Offices
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
