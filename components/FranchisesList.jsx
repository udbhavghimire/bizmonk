import Link from "next/link";
import { franchiseList } from "@/data/franchise-data";

const FranchisesList = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
          50+ Elite Franchise Brands
        </h2>
        <p className="mx-auto text-sm text-gray-500">
          Partner with proven business models. Explore our curated selection of 
          profitable franchise opportunities across Ontario.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {franchiseList.map((partner) => (
          <Link
            key={partner.name}
            href={"/franchise-opportunity/ontario/"}
            className="group flex flex-col items-center"
          >
            <div className="relative rounded-3xl overflow-hidden bg-white flex items-center justify-center border border-gray-50">
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="w-auto h-24 object-contain"
              />
            </div>
            <p className="mt-4 text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors text-center">
              {partner.displayName}
            </p>
          </Link>
        ))}
      </div>
      <div className="flex w-full justify-center mt-12">
        <Link
          href="#contact"
          className="inline-flex items-center justify-center px-10 py-4 bg-black text-white rounded-full font-bold text-base hover:bg-gray-800 transition-all active:scale-95"
        >
          Request Portfolio
        </Link>
      </div>
    </div>
  );
};

export default FranchisesList;
