import Link from "next/link";

import { franchiseLocations } from "@/data/franchise-data";

export default function FeaturedFranchises() {
  // Get the Ontario franchises (or change to another location if needed)
  const franchises = franchiseLocations.ontario.franchises.slice(0, 8);

  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {franchises.map((franchise) => (
          <Link
            key={franchise.name}
            href={`/franchise-opportunity/ontario/${franchise.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "")}`}
            className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
              <img
                src={franchise.image}
                alt={franchise.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary rounded shadow-sm flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                  Verified
                </span>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors line-clamp-1">
                {franchise.name}
              </h3>
              <p className="text-sm font-medium text-gray-500 mb-2">
                {franchise.type}
              </p>
              <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900">{franchise.investment}</span>
                <span className="text-primary text-sm font-bold group-hover:translate-x-1 transition-transform inline-flex items-center">
                  View →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}