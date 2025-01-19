import React from "react";
import Image from "next/image";
import Link from "next/link";
const RelatedFranchises = ({ franchiseData, locationData, location }) => {
  return (
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
  );
};

export default RelatedFranchises;
