import Link from "next/link";

import { franchiseLocations } from "@/data/franchise-data";

export default function FeaturedFranchises() {
  // Get the Ontario franchises (or change to another location if needed)
  const franchises = franchiseLocations.ontario.franchises.slice(0, 8);

  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {franchises.map((franchise) => (
          <Link
            key={franchise.name}
            href={`/franchise-opportunity/ontario/${franchise.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "")}`}
            className="group rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 bg-white"
          >
            <div className="flex items-center justify-center w-full bg-gray-50">
              <img
                src={franchise.image}
                alt={franchise.name}
                className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{franchise.name}</h3>
              <p className="text-sm text-gray-700 mb-1">{franchise.type}</p>
              <p className="text-xs text-gray-500">{franchise.investment}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}