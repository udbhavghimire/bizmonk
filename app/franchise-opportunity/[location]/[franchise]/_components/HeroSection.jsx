import React from "react";
import Image from "next/image";
import Link from "next/link";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";

const HeroSection = ({ franchiseData, location }) => {
  const locationText = location
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return (
    <div className="relative pb-24 pt-10 overflow-hidden">
      <div className="absolute inset-0" />
      <div className="relative max-w-7xl mx-auto  sm:px-6 lg:px-8">
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
              href={`/franchise-opportunity/${location.replaceAll(" ", "-")}`}
              className="hover:text-primary"
            >
              {location === "ontario" ? "Ontario" : locationText}
            </Link>
            <span className="text-primary font-medium">
              {franchiseData.name}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
            {/* Hero Image */}
            <div className="relative flex md:h-[400px] w-full flex-col md:flex-row">
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/30 to-transparent" /> */}
              <div className="w-full md:w-[50%] py-4 md:p-10">
                <h1 className="text-3xl font-bold mb-4 drop-shadow-xl leading-[2.5rem] open-sans">
                  {franchiseData.name} Franchise Opportunity in {locationText}
                </h1>
                <div className="h-[300px] relative block md:hidden ">
                  {franchiseData.image && (
                    <Image
                      src={franchiseData.image}
                      alt={franchiseData.name}
                      fill
                      className="object-cover rounded-3xl"
                    />
                  )}
                </div>
                <p className="text-gray-600 leading-relaxed mt-8">
                  {franchiseData.description}
                </p>
              </div>
              <div className="w-[50%]  hidden md:block relative rounded-3xl overflow-hidden m-3 h-full">
                {franchiseData.image && (
                  <Image
                    src={franchiseData.image}
                    alt={franchiseData.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-2 md:py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Info */}

                {/* <div>
                    <h2 className="text-2xl font-bold mb-4">
                      About the Franchise
                    </h2>
                  </div> */}

                <div className="col-span-full flex flex-col items-center justify-center md:my-20">
                  <h2 className="text-2xl font-bold mb-4">
                    Why Choose {franchiseData?.name}
                  </h2>
                  <ul className="grid md:grid-cols-2 my-4 md:gap-x-5">
                    {franchiseData.specialities?.map((point, index) => (
                      <li
                        key={index}
                        className="w-full flex justify-start items-start gap-x-3 mb-2 text-sm"
                      >
                        <span className="text-primary">✓</span>
                        <span className="text-gray-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-row gap-4">
                    <Link
                      href="#contact"
                      className="block text-center px-6 py-3 bg-black text-white rounded-full hover:bg-primary/90 transition-colors font-medium text-nowrap"
                    >
                      Learn More
                    </Link>

                    {franchiseData.brochure && (
                      <a
                        href={franchiseData.brochure}
                        className="block text-center px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-medium text-nowrap"
                        download
                      >
                        Download Brochure PDF
                      </a>
                    )}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="col-span-full sm:space-y-0">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-2xl text-center font-semibold mb-4">
                      Investment Details
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0">
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">
                          Investment Range
                        </p>
                        <p className="font-semibold text-gray-900">
                          {franchiseData.investment}
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Type</p>
                        <p className="font-semibold text-gray-900">
                          {franchiseData.type}
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-semibold text-gray-900">
                          {franchiseData.locations}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {franchiseData.financing && (
                  <section className="md:col-span-3 flex flex-col justify-center mt-10">
                    <span className="text-center uppercase text-2xl font-bold text-primary">
                      Financial Requirements
                    </span>
                    <div className="flex justify-center mt-4 flex-wrap gap-2 sm:gap-4 my-6">
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
                            <p className="text-2xl font-bold text-black">
                              {stat.value}
                            </p>
                            <p className="text-sm">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {/* <div className="w-full flex justify-center md:col-span-3 my-10">
                  <Link
                    href="#contact"
                    className="max-w-2xl mx-auto px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors font-medium"
                  >
                    Contact Us!
                  </Link>
                </div> */}

                {franchiseData?.storeModels && (
                  <div className="md:col-span-3">
                    <p className="text-2xl text-center uppercase font-bold text-primary">
                      Available store models
                    </p>
                    <div className="flex flex-col space-y-4 my-4">
                      {franchiseData.storeModels.map((model) => (
                        <div
                          key={model.type}
                          className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-2 hover:bg-gray-100 p-4 rounded-md"
                        >
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
              <div className="flex w-full justify-center mt-3">
                <div></div>
                <div className="flex flex-col gap-y-3">
                  <Link
                    href="#contact"
                    className="block text-center w-full px-6 py-3 bg-black text-white rounded-full hover:bg-primary/90 transition-colors font-medium text-nowrap"
                  >
                    Request Information
                  </Link>
                  {/* <button className="w-full px-6 py-3 border-2 border-primary text-primary rounded-full hover:bg-primary/5 transition-colors font-medium text-nowrap">
                    Schedule Call
                  </button> */}
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
