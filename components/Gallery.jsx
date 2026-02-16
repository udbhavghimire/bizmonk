"use client";

import { useState, useEffect } from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// Plugins
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

const Gallery = ({ mediaImages }) => {
  const [mounted, setMounted] = useState(false); // ensure client mount
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  let lightGalleryInstance = null;

  useEffect(() => {
    setMounted(true);
  }, []);

  const onInit = (detail) => {
    lightGalleryInstance = detail.instance;
  };

  // Server-safe placeholder
  if (!mounted) {
    return (
      <div className="h-[520px] flex items-center justify-center bg-gray-200 rounded-lg animate-pulse">
        <p className="text-gray-400">Loading gallery...</p>
      </div>
    );
  }

  if (!mediaImages?.length) {
    return (
      <div className="h-[520px] flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="flex flex-col items-center">
          <img
            src="/icons/no-photo.png"
            className="w-10 h-10"
            alt="No photos"
          />
          <p className="text-gray-500">No images available</p>
        </div>
      </div>
    );
  }

  const handlePrevious = () =>
    setCurrentImageIndex((prev) =>
      prev === 0 ? mediaImages.length - 1 : prev - 1,
    );

  const handleNext = () =>
    setCurrentImageIndex((prev) =>
      prev === mediaImages.length - 1 ? 0 : prev + 1,
    );

  return (
    <div className="relative">
      {/* Mobile Gallery */}
      <div className="md:hidden">
        <div className="relative w-full h-[300px]">
          <img
            src={mediaImages[currentImageIndex].MediaURL}
            alt={`Property image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />

          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
            aria-label="Previous image"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
            aria-label="Next image"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className="flex gap-2 mt-2 px-2 overflow-x-auto pb-2 hide-scrollbar">
            {mediaImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-[80px] h-[60px] rounded-lg overflow-hidden border-2 ${
                  index === currentImageIndex
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
              >
                <img
                  src={img.MediaURL}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Gallery */}
      <div className="hidden md:block">
        <LightGallery
          onInit={onInit}
          speed={0}
          plugins={[lgThumbnail, lgZoom]}
          elementClassNames="grid grid-cols-4 gap-2 mb-8"
          mode="lg-fade"
          hideScrollbar
        >
          {mediaImages.slice(0, 5).map((img, idx) => (
            <a
              key={idx}
              href={img.MediaURL}
              className={`relative cursor-pointer group ${idx === 0 ? "col-span-2 row-span-2" : ""}`}
              data-lg-size="1600-2400"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src={img.MediaURL}
                  alt={`Property image ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </a>
          ))}

          {/* Hidden images for LightGallery */}
          {mediaImages.slice(5).map((img, idx) => (
            <a
              key={idx}
              href={img.MediaURL}
              className="hidden"
              data-lg-size="1600-2400"
            >
              <img src={img.MediaURL} alt={`Property image ${idx + 6}`} />
            </a>
          ))}
        </LightGallery>

        {mediaImages.length > 5 && (
          <button
            onClick={() => lightGalleryInstance?.openGallery(4)}
            className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors"
          >
            +{mediaImages.length - 5} more photos
          </button>
        )}
      </div>
    </div>
  );
};

export default Gallery;
