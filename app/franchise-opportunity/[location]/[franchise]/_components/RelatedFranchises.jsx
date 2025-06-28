import React from "react";
import Image from "next/image";
import Link from "next/link";

const RelatedFranchises = ({ franchiseData, locationData, location }) => {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-16 text-center">
          Other Franchise Opportunities in{" "}
          {location.charAt(0).toUpperCase() + location.slice(1)}
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {locationData.franchises
            .filter((f) => f.name !== franchiseData.name)
            .map((franchise) => (
              <Link
                key={franchise.name}
                href={`/franchise-opportunity/${location}/${franchise.name
                  .toLowerCase()
                  .replaceAll(" ", "-")
                  .replaceAll("'", "")}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-72 sm:h-80">
                  {franchise.image && (
                    <Image
                      src={franchise.image}
                      alt={franchise.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-xl">
                      {franchise.name}
                    </h3>
                    <p className="text-white drop-shadow-xl">
                      {franchise.type}
                    </p>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 mb-4">
                    Join one of Canada's fastest-growing franchise networks
                  </p>
                  <p className="text-primary font-semibold inline-flex items-center">
                    Learn More
                    <span className="ml-2 text-lg">→</span>
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedFranchises;
