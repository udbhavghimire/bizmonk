import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocationContent } from "@/data/franchise-data";
import Newsletter from "@/components/Newsletter";

const cities = [
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
  "Oshawa",
  "Newmarket",
  "Aurora",
  "Whitby",
];

export default function FranchiseOpportunityPage({ params }) {
  const { location } = params;
  const locationData = getLocationContent(location);

  if (!locationData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl mb-6">
              <span className="text-primary">{locationData.title}</span>
            </h1>
            <p className="text-xl text-gray-600">{locationData.description}</p>
          </div>

          {/* Franchise Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {locationData.franchises.map((franchise) => (
              <div
                key={franchise.name}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {/* Image Section */}
                <div className="relative h-72">
                  <Image
                    src={franchise.image}
                    alt={franchise.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-center">
                    <h3 className="text-2xl font-bold mb-2 text-white">
                      {franchise.name}
                    </h3>
                    <p className="text-sm text-gray-200 bg-black/30 inline-block px-3 py-1 rounded-full">
                      {franchise.type}
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 text-center">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {franchise.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-4 justify-center">
                    <Link
                      href={`/franchise-opportunity/${location}/${franchise.name
                        .toLowerCase()
                        .replace(/['\s]+/g, "-")}`}
                      className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors font-medium"
                    >
                      Learn More
                    </Link>
                    <button className="px-6 py-3 border-2 border-primary text-primary rounded-full hover:bg-primary/5 transition-colors font-medium">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* City Navigation Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Explore Business Opportunities
            </h2>
            <p className="text-gray-600">
              Discover franchise opportunities and other business listings
              across the Greater Toronto Area
            </p>
          </div>

          {/* Popular Cities */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold mb-6 text-center">
              Popular Locations
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {cities.map((city) => (
                <Link
                  key={city}
                  href={`/franchise-opportunity/${city
                    .toLowerCase()
                    .replace(" ", "-")}`}
                  className={`${
                    location.toLowerCase() ===
                    city.toLowerCase().replace(" ", "-")
                      ? "bg-primary text-white"
                      : "bg-white text-gray-600 hover:bg-primary/5"
                  } px-4 py-3 rounded-lg text-center transition-colors duration-300`}
                >
                  <span className="text-sm font-medium">{city}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Other Business Opportunities */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link
              href={`/${location}/restaurant-for-sale`}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary">
                Restaurants for Sale
              </h3>
              <p className="text-sm text-gray-600">
                Find restaurant businesses available in {location}
              </p>
            </Link>

            <Link
              href={`/${location}/convenience-store-for-sale`}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary">
                Convenience Stores
              </h3>
              <p className="text-sm text-gray-600">
                Explore convenience store opportunities in {location}
              </p>
            </Link>

            <Link
              href={`/${location}/offices-for-lease`}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary">
                Office Spaces
              </h3>
              <p className="text-sm text-gray-600">
                Find available office spaces in {location}
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-center text-white max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Franchise Journey?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Our franchise experts are here to help you find the perfect
              opportunity and guide you through the entire process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-3 bg-white text-primary rounded-full hover:bg-gray-100 transition-colors font-medium"
              >
                Schedule Consultation
              </Link>
              <Link
                href="/franchise-guide"
                className="px-8 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors font-medium"
              >
                Download Franchise Guide
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Newsletter />
    </div>
  );
}

// Update static paths
export async function generateStaticParams() {
  return cities.map((city) => ({
    location: city.toLowerCase().replace(" ", "-"),
  }));
}
