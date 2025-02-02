"use client";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), { 
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full rounded-lg overflow-hidden bg-gray-100 animate-pulse" />
  )
});

const MapSection = ({ main_data }) => {
  return (
    <div className="z-20 relative mt-12 sm:mt-24">
      <h2 className="font-bold text-2xl sm:text-4xl mb-2">Map View</h2>
      <Map main_data={main_data} />
    </div>
  );
};

export default MapSection; 