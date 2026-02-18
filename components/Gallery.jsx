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
      <div className="h-[300px] md:h-[500px] flex items-center justify-center bg-gray-100 rounded-2xl animate-pulse">
        <p className="text-gray-400 font-medium">Loading gallery...</p>
      </div>
    );
  }

  if (!mediaImages?.length) {
    return (
      <div className="h-[300px] md:h-[500px] flex items-center justify-center bg-gray-50 rounded-2xl border border-gray-100">
        <div className="flex flex-col items-center gap-3">
          <div className="bg-white p-3 rounded-full shadow-sm">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">No images available</p>
        </div>
      </div>
    );
  }

  const handlePrevious = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? mediaImages.length - 1 : prev - 1
    );
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === mediaImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative w-full">
      {/* Mobile Gallery */}
      <div className="md:hidden relative group">
        <div 
          className="relative w-full aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden"
          onClick={() => lightGalleryInstance?.openGallery(currentImageIndex)}
        >
          <img
            src={mediaImages[currentImageIndex].MediaURL}
            alt={`Property view ${currentImageIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 flex justify-center">
             <div className="flex gap-1.5">
              {mediaImages.slice(0, 5).map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
                />
              ))}
             </div>
          </div>
        </div>

        {/* Navigation Buttons for Mobile */}
        {mediaImages.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity active:opacity-100"
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-700">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity active:opacity-100"
              aria-label="Next image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-700">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}
        
        {/* Hidden LightGallery for Mobile to enable zoom/fullscreen */}
        <div style={{ display: 'none' }}>
           <LightGallery
              onInit={onInit}
              speed={500}
              plugins={[lgThumbnail, lgZoom]}
              dynamic={true}
              dynamicEl={mediaImages.map(img => ({
                  src: img.MediaURL,
                  thumb: img.MediaURL,
              }))}
          />
        </div>
      </div>

      {/* Desktop Gallery - Bento Grid */}
      <div className="hidden md:block h-[500px] w-full rounded-2xl overflow-hidden">
        <LightGallery
          onInit={onInit}
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
          elementClassNames="h-full w-full grid grid-cols-4 grid-rows-2 gap-2"
          mode="lg-fade"
        >
          {/* Main Image - Large (Left) */}
          {mediaImages[0] && (
            <a
              href={mediaImages[0].MediaURL}
              className="col-span-2 row-span-2 relative cursor-pointer group overflow-hidden"
            >
              <img
                src={mediaImages[0].MediaURL}
                alt="Main Property Image"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </a>
          )}

          {/* Sub Images - Right Grid */}
          {mediaImages.slice(1, 5).map((img, idx) => (
            <a
              key={idx}
              href={img.MediaURL}
              className="relative cursor-pointer group overflow-hidden bg-gray-100"
            >
              <img
                src={img.MediaURL}
                alt={`Property image ${idx + 2}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
               
               {/* Show "View all photos" on the last grid item if there are more photos */}
               {idx === 3 && mediaImages.length > 5 && (
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px] group-hover:bg-black/50 transition-colors">
                    <span className="text-white font-semibold text-lg flex items-center gap-2">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                      </svg>
                      +{mediaImages.length - 5} photos
                    </span>
                 </div>
               )}
            </a>
          ))}
          
           {/* Hidden images for LightGallery to pick up */}
           {mediaImages.slice(5).map((img, idx) => (
            <a
              key={idx + 5}
              href={img.MediaURL}
              className="hidden"
            >
              <img src={img.MediaURL} alt={`Property image ${idx + 6}`} />
            </a>
          ))}

        </LightGallery>
      </div>

       {/* Mobile View All Button (Optional overlay) */}
        {!mounted && <div className="hidden" />}
    </div>
  );
};

export default Gallery;
