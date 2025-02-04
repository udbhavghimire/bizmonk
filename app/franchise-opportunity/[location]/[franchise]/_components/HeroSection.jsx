import React from "react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = ({ franchiseData, location }) => {
  return (
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
            <div className="relative h-[600px]">
              {franchiseData.image && (
                <Image
                  src={franchiseData.image}
                  alt={franchiseData.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/30 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-xl">
                  {franchiseData.name}
                </h1>
                <p className="text-lg text-white drop-shadow-xl">
                  Franchise Opportunity in{" "}
                  {location.charAt(0).toUpperCase() + location.slice(1)}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-2 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="col-span-1 md:col-span-2 space-y-6">
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
                      {franchiseData.specialities?.map((point, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <span className="text-primary">✓</span>
                          <span className="text-gray-600">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {franchiseData.brochure && (
                    <div>
                      <a
                        href={franchiseData.brochure}
                        className="w-full px-6 py-3 mt-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-medium"
                        download
                      >
                        Download Brochure PDF
                      </a>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="col-span-1 sm:space-y-6">
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
                    <Link
                      href="#contact"
                      className="block text-center w-full px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors font-medium"
                    >
                      Request Information
                    </Link>
                    <button className="w-full px-6 py-3 border-2 border-primary text-primary rounded-full hover:bg-primary/5 transition-colors font-medium">
                      Schedule Call
                    </button>
                  </div>
                </div>

                {franchiseData.financing && (
                  <section className="md:col-span-3 flex flex-col justify-center mt-10">
                    <span className="text-center uppercase text-2xl font-bold text-primary">
                      Financial Requirements
                    </span>
                    <div className="flex justify-center mt-4 flex-wrap gap-2 sm:gap-4">
                      {Object.keys(franchiseData.financing).map((key, idx) => (
                        <div
                          className="flex flex-col w-2/5 md:w-1/3 border-b border-gray-300 pb-2 items-center"
                          key={idx}
                        >
                          <p className="font-bold uppercase tracking-wide text-center">
                            {key}
                          </p>
                          <p className="text-center">
                            {franchiseData.financing[key]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {franchiseData.stats && (
                  <section className="flex flex-col items-center md:col-span-3 mt-20 mb-0 md:mb-4">
                    <p className="text-2xl uppercase font-bold text-primary">
                      Key Stats
                    </p>
                    <div className="py-2 rounded-md">
                      <div className="max-w-xl md:max-w-5xl mx-auto flex md:flex-row flex-col md:space-y-0 space-y-2 justify-around">
                        {franchiseData.stats.map((stat, index) => (
                          <div
                            key={index}
                            className={`text-center text-black flex-1 flex flex-col justify-center ${
                              index < franchiseData.stats.length - 1 &&
                              "border-b-2 md:border-b-0 md:border-r-2"
                            }`}
                          >
                            <p className="text-5xl font-bold text-black">
                              {stat.value}
                            </p>
                            <p className="text-sm">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                <div className="w-full flex justify-center md:col-span-3 my-10">
                  <Link
                    href="#contact"
                    className="max-w-2xl mx-auto px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors font-medium"
                  >
                    Contact Us!
                  </Link>
                </div>

                {franchiseData?.storeModels && (
                  <div className="md:col-span-3">
                    <p className="text-2xl text-center uppercase font-bold text-primary">
                      Available store models
                    </p>
                    <div className="flex flex-col space-y-4 my-4">
                      {franchiseData.storeModels.map((model) => (
                        <div key={model.type} className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-2 hover:bg-gray-100 p-4 rounded-md">
                          {model.image && (
                            <Image
                              height={200}
                              width={300}
                              src={model.image}
                              alt={model.type}
                              className="rounded-md"
                            />
                          )}
                          <section>
                            <p className="text-lg font-bold">{model.type}</p>
                            <p>{model.description}</p>
                          </section>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
