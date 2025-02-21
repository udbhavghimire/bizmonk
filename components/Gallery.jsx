"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import { getImageUrls } from "@/api/getImageUrls";

// Import plugins
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

const Gallery = ({ ResourceRecordKey }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  let lightGalleryInstance = null;

  useEffect(() => {
    const fetchImages = async () => {
      if (!ResourceRecordKey) {
        setLoading(false);
        return;
      }

      try {
        const urls = await getImageUrls({ 
          ResourceRecordKey,
          size: 'large'
        });
        const uniqueUrls = [...new Set(urls)];
        const processedImages = uniqueUrls.map(url => ({
          url,
          description: 'Property Image'
        }));
        setImages(processedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [ResourceRecordKey]);

  const onInit = (detail) => {
    lightGalleryInstance = detail.instance;
  };

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-[520px] rounded-[10px]" />;
  }

  if (!images?.length) {
    return (
      <div className="h-[520px] flex items-center justify-center bg-gray-100 rounded-[10px]">
        <div className="flex flex-col items-center">
          <img src="/icons/no-photo.png" className="w-10 h-10" alt="No photos" />
          <p className="text-gray-500">No images available</p>
        </div>
      </div>
    );
  }

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative">
      {/* Mobile Gallery */}
      <div className="md:hidden">
        <div className="relative w-full">
          <div className="relative w-full h-[300px]">
            <Image
              src={images[currentImageIndex].url}
              alt={`Property image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
          </div>

          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className="flex gap-2 mt-2 px-2 overflow-x-auto pb-2 hide-scrollbar">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative flex-shrink-0 w-[80px] h-[60px] rounded-lg overflow-hidden ${
                  currentImageIndex === index ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <Image
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
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
          cssEasing="none"
          hideScrollbar={true}
          closable={true}
          escKey={true}
          showZoomInOutIcons={false}
          actualSize={false}
          startAnimationDuration={0}
          backdropDuration={0}
          zoomFromOrigin={false}
          addClass="lg-thumb-align-middle"
        >
          {images.slice(0, 5).map((image, index) => (
            <a
              key={index}
              href={image.url}
              className={`relative cursor-pointer group ${
                index === 0 ? "col-span-2 row-span-2" : ""
              } ${index >= 5 ? "hidden" : ""}`}
              data-lg-size="1600-2400"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={image.url}
                  alt={`Property image ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </a>
          ))}

          {/* Hidden images for LightGallery */}
          {images.slice(5).map((image, index) => (
            <a
              key={`hidden-${index}`}
              href={image.url}
              className="hidden"
              data-lg-size="1600-2400"
            >
              <Image
                src={image.url}
                alt={`Property image ${index + 6}`}
                width={1600}
                height={2400}
              />
            </a>
          ))}
        </LightGallery>

        {images.length > 5 && (
          <button
            onClick={() => lightGalleryInstance?.openGallery(4)}
            className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors"
          >
            +{images.length - 5} more photos
          </button>
        )}
      </div>
    </div>
  );
};

export default Gallery;