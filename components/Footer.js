import Link from "next/link";
import cities from "@/data/gta-cities.json";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        {/* Cities Section with improved design */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
            <span className="text-primary">Explore Restaurants for Sale</span>
            <span className="block text-lg font-normal text-gray-600 mt-2">
              Find the perfect restaurant business opportunity in your city
            </span>
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {cities.cities.map((city) => (
                <Link
                  key={city}
                  href={`/${city.toLowerCase()}/restaurant-for-sale`}
                  className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm py-1"
                >
                  Restaurant for sale in {city}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-gray-200 py-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-4 space-y-4">
            <Link href="/" className="block">
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-blue-600 text-transparent bg-clip-text">
                Bizmonk
              </span>
            </Link>
            <p className="text-gray-600">
              Your trusted partner in finding the perfect business space across
              the Greater Toronto Area.
            </p>
            <div className="flex space-x-4">
              {[
                {
                  icon: FaFacebook,
                  href: "https://www.facebook.com/profile.php?id=61571463021782",
                  hoverColor: "hover:text-blue-600",
                },
                {
                  icon: FaInstagram,
                  href: "https://www.instagram.com/bizmonkcanada/",
                  hoverColor: "hover:text-pink-600",
                },
                {
                  icon: FaYoutube,
                  href: "https://youtube.com/@bizmonkcanada?si=FjlFJOmTM_b2SjfF",
                  hoverColor: "hover:text-red-600",
                },
                {
                  icon: FaTiktok,
                  href: "https://www.tiktok.com/@bizmonkcanada",
                  hoverColor: "hover:text-black",
                },
              ].map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.hoverColor} transition-colors`}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Section Grid */}
          <div className="col-span-1 md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Categories */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Categories
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "Restaurants", href: "/restaurant-for-sale" },
                  {
                    label: "Convenience Stores",
                    href: "/convenience-store-for-sale",
                  },
                  { label: "Retail Leases", href: "/retail-lease" },
                  { label: "Franchises", href: "/franchises" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Contact
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span>📧</span> info@bizmonk.ca
                </li>
                <li className="flex items-center gap-2">
                  <span>📞</span> 905-226-7284
                </li>
                <li className="flex items-center gap-2">
                  <span>📍</span> 1065 Canadian Pl Suite 207, Mississauga ON L4W
                  0C2
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "About Us", href: "/about" },
                  { label: "Contact", href: "/contact" },
                  { label: "Blog", href: "/blog" },
                  { label: "Terms of Service", href: "/terms" },
                  { label: "Privacy Policy", href: "/privacy" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Logo and copyright */}
        <div className="mt-16 pt-8 pb-5">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center space-y-4 gap-4">
            <div className="flex flex-col items-center space-y-4">
              <img src="/trebb.png" alt="TREBB Logo" className="w-28" />
              <p className="text-xs text-gray-500 max-w-2xl text-center">
                Toronto Real Estate Board (TRREB); All information deemed
                reliable but not guaranteed. All properties are subject to prior
                sale, change or withdrawal. Neither listing broker(s) or
                information provider(s) shall be responsible for any
                typographical errors, misinformation, misprints and shall be
                held totally harmless. Listing(s) information is provided for
                consumer's personal, non-commercial use and may not be used for
                any purpose other than to identify prospective properties
                consumers may be interested in purchasing. The data relating to
                real estate for sale on this website comes in part from the
                Internet Data Exchange program of the Multiple Listing Service.
                Real estate listings held by brokerage firms other than Team
                Ravi - Elixir Real Estate Inc. Brokerage. may be marked with the
                Internet Data Exchange logo and detailed information about those
                properties will include the name of the listing broker(s) when
                required by the MLS. Copyright ©{new Date().getFullYear()} All
                rights reserved.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <img src="/crea.png" alt="CREA Logo" className="w-28" />
              <p className="text-xs text-gray-500 max-w-2xl text-center">
                The listing data displayed is deemed reliable but is not
                guaranteed accurate by CREA®. The trademarks REALTOR®,
                REALTORS®; and the REALTOR® logo are controlled by The Canadian
                Real Estate Association (CREA®) and identify real estate
                professionals who are members of CREA®. Used under license. The
                trademarks MLS®, Multiple Listing Service® and the associated
                logos are owned by The Canadian Real Estate Association (CREA®)
                and identify the quality of services provided by real estate
                professionals who are members of CREA®. Used under license.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 py-8">
          <div className="space-y-6">
            <div className="text-xs text-gray-500 max-w-3xl mx-auto text-center leading-relaxed">
              The REALTOR® trademark is controlled by The Canadian Real Estate
              Association (CREA) and identifies real estate professionals who
              are members of CREA. The trademarks MLS®, Multiple Listing
              Service® and the associated logos identify professional services
              rendered by REALTOR® members of CREA to effect the purchase, sale
              and lease of real estate as part of a cooperative selling system.
            </div>
            <div className="flex justify-center">
              <Image src="/crea.svg" alt="CREA Logo" width={64} height={64} />
            </div>
            <p className="text-center text-gray-600 text-sm">
              © {new Date().getFullYear()} BizMonk. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
