import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">Bizmonk</span>
            </Link>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          <div className="hidden sm:flex items-center space-x-4">
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
