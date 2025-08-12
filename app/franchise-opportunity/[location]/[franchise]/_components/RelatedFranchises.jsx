import React from "react";
import Image from "next/image";
import Link from "next/link";

const RelatedFranchises = ({ franchiseData, locationData, location }) => {
  return (
    <div className="py-8 bg-gray-50 md:max-w-5xl mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
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
                </div>
                <div className="p-6">
                  <div className="">
                    <h3 className="text-2xl font-bold text-black mb-2 drop-shadow-xl">
                      {franchise.name}
                    </h3>
                    <p className="text-black drop-shadow-xl font-semibold ">
                      {franchise.type}
                    </p>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Join one of Canada's fastest-growing franchise networks
                  </p>
                  <p className="text-primary font-semibold inline-flex items-center">
                    Learn More
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
