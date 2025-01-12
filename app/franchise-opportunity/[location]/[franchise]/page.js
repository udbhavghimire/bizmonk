import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocationContent } from "@/data/franchise-data";
import Newsletter from "@/components/Newsletter";

export default function FranchiseDetailPage({ params }) {
  const { location, franchise } = params;
  const locationData = getLocationContent(location);

  if (!locationData) {
    notFound();
  }

  const franchiseData = locationData.franchises.find(
    (f) => f.name.toLowerCase().replace(/['\s]+/g, "-") === franchise
  );

  if (!franchiseData) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative pb-24 pt-10 overflow-hidden">
        <div className="absolute inset-0" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Breadcrumb */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <span>→</span>
              <Link
                href="/franchise-opportunity/ontario"
                className="hover:text-primary"
              >
                Franchises
              </Link>
              <span>→</span>
              <Link
                href={`/franchise-opportunity/${location}`}
                className="hover:text-primary"
              >
                {location === "ontario"
                  ? "Ontario"
                  : location.charAt(0).toUpperCase() + location.slice(1)}
              </Link>
              <span>→</span>
              <span className="text-primary font-medium">
                {franchiseData.name}
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
              {/* Hero Image */}
              <div className="relative h-[400px]">
                <Image
                  src={franchiseData.image}
                  alt={franchiseData.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h1 className="text-4xl font-bold text-white mb-4">
                    {franchiseData.name}
                  </h1>
                  <p className="text-lg text-gray-200">
                    Franchise Opportunity in{" "}
                    {location.charAt(0).toUpperCase() + location.slice(1)}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Main Info */}
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">
                        About the Franchise
                      </h2>
                      <p className="text-gray-600 leading-relaxed">
                        {franchiseData.description}
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold mb-4">
                        Why Choose This Franchise
                      </h2>
                      <ul className="space-y-3">
                        {[
                          "Proven business model with strong track record",
                          "Comprehensive training and ongoing support",
                          "Strong brand recognition and marketing support",
                          "Prime location opportunities",
                          "Established supply chain and operations systems",
                        ].map((point, index) => (
                          <li key={index} className="flex items-center gap-3">
                            <span className="text-primary">✓</span>
                            <span className="text-gray-600">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold mb-4">
                        Investment Details
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            Investment Range
                          </p>
                          <p className="font-semibold text-gray-900">
                            {franchiseData.investment}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Type</p>
                          <p className="font-semibold text-gray-900">
                            {franchiseData.type}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-semibold text-gray-900">
                            {franchiseData.locations}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <button className="w-full px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors font-medium">
                        Request Information
                      </button>
                      <button className="w-full px-6 py-3 border-2 border-primary text-primary rounded-full hover:bg-primary/5 transition-colors font-medium">
                        Schedule Call
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Franchises Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Other Franchise Opportunities in{" "}
            {location.charAt(0).toUpperCase() + location.slice(1)}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {locationData.franchises
              .filter((f) => f.name !== franchiseData.name)
              .map((franchise) => (
                <Link
                  key={franchise.name}
                  href={`/franchise-opportunity/${location}/${franchise.name
                    .toLowerCase()
                    .replace(/['\s]+/g, "-")}`}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4"
                >
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={franchise.image}
                      alt={franchise.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {franchise.name}
                    </h3>
                    <p className="text-sm text-gray-600">{franchise.type}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* Explore More Cities Section */}
      <div className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Explore {franchiseData.name} in Other Cities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Toronto", "Mississauga", "Brampton", "Vaughan"].map((city) => (
              <Link
                key={city}
                href={`/franchise-opportunity/${city.toLowerCase()}/${franchise}`}
                className="bg-gray-50 rounded-lg p-4 text-center hover:bg-primary/5 transition-colors"
              >
                <span className="text-gray-900">{city}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Newsletter />
    </div>
  );
}

export async function generateStaticParams() {
  const cities = [
    "all",
    "toronto",
    "mississauga",
    "brampton",
    "vaughan",
    "markham",
    "richmond-hill",
    "oakville",
    "ajax",
    "pickering",
    "milton",
    "burlington",
    "oshawa",
    "newmarket",
    "aurora",
    "whitby",
  ];

  const franchises = ["mary-browns-chicken", "fat-bastard-burrito"];

  return cities.flatMap((city) =>
    franchises.map((franchise) => ({
      location: city,
      franchise: franchise,
    }))
  );
}
