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
    <div className="z-0 relative h-[400px] w-full">
      <Map main_data={main_data} />
    </div>
  );
};

export default MapSection; 