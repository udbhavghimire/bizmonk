import Link from "next/link";
import cities from "@/data/gta-cities.json";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        {/* Add new Cities Section */}
        <div className="mb-12">
          <h2 className="md:text-5xl text-3xl font-extrabold text-900 mb-6 text-center text-black">
            Explore Restaurant for sale in Canada
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-2 justify-items-center pt-4">
              {cities.cities.map((city) => (
                <div key={city} className="text-center w-full">
                  <Link
                    href={`/${city.toLowerCase()}/restaurant-for-sale`}
                    className="text-black hover:text-blue-600 text-center md:text-[13px] text-[9px]"
                  >
                    Restaurant for sale in {city}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-32 md:text-start text-center">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-4">
            <h3 className="text-md font-semibold text-gray-900 mb-4">
              Bizmonk
            </h3>
            <p className="text-gray-600 mb-4">
              Your trusted partner in finding the perfect business space across
              the Greater Toronto Area.
            </p>
          </div>

          {/* Right Section Grid */}
          <div className="col-span-1 md:col-span-7 md:col-start-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Categories */}
            <div className="col-span-1">
              <h3 className="text-md font-semibold text-gray-900 mb-4">
                Categories
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/restaurant-for-sale"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Restaurants
                  </Link>
                </li>
                <li>
                  <Link
                    href="/convenience-store-for-sale"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Convenience Stores
                  </Link>
                </li>
                <li>
                  <Link
                    href="/offices-for-lease"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Office Spaces
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-span-1">
              <h3 className="text-md font-semibold text-gray-900 mb-4">
                Contact Us
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>Email: info@bizmonk.ca</li>
                <li>Phone: (647) 123-4567</li>
                <li>Toronto, ON, Canada</li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="col-span-1">
              <h3 className="text-md font-semibold text-gray-900 mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Bizmonk. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
