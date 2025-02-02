"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { getImageUrls } from "@/api/getImageUrls";

const LightGallery = dynamic(() => import("lightgallery/react"), {
  ssr: false,
});
// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MobileGallery = ({ listingKey }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const urls = await getImageUrls({ MLS: listingKey, thumbnailOnly: false });
        if (urls?.length > 0) {
          setImages(urls.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    if (listingKey) {
      fetchImages();
    }
  }, [listingKey]);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `/noimage.webp`;
  };

  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  const scrollToImage = (index) => {
    scrollContainerRef.current?.scrollTo({
      left: index * scrollContainerRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const nextSlide = (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    scrollToImage(newIndex);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    scrollToImage(newIndex);
  };

  if (loading) {
    return (
      <div className="grid grid-rows-3 sm:grid-rows-2 grid-cols-4 gap-2">
        {[...Array(5)].map((_, index) => (
          <div 
            key={index} 
            className={`animate-pulse bg-gray-200 rounded-[10px] ${
              index === 0
                ? "row-span-2 col-span-4 sm:col-span-2 h-[240px] sm:h-[520px]"
                : "h-[100px] sm:h-[255px]"
            }`}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      {LightGallery ? (
        <div className="relative">
          <LightGallery
            onInit={onInit}
            speed={500}
            plugins={[lgThumbnail, lgZoom]}
            elementClassNames="grid grid-rows-3 sm:grid-rows-2 grid-cols-4 gap-2"
          >
            <>
              {images.length > 0 ? (
                images.map((url, index) => (
                  <Link
                    href={url}
                    key={index}
                    className={`MobileGallery-item ${
                      index === currentIndex
                        ? "row-span-2 col-span-4 sm:col-span-2"
                        : ""
                    } ${index >= 5 ? "hidden" : ""}`}
                  >
                    <img
                      src={url}
                      className={`w-full ${
                        index === 0
                          ? "h-[240px] sm:h-[520px]"
                          : "h-[100px] sm:h-[255px]"
                      } object-cover object-center rounded-[10px]`}
                      alt={`Property Image ${index + 1}`}
                      onError={handleImageError}
                    />
                  </Link>
                ))
              ) : (
                <div className="row-span-2 col-span-4 sm:col-span-2 h-[240px] sm:h-[520px] flex items-center justify-center bg-gray-100 rounded-[10px]">
                  <div className="flex flex-col items-center">
                    <img src="/icons/no-photo.png" className="w-10 h-10" alt="No photos" />
                    <p className="text-gray-500">No images available</p>
                  </div>
                </div>
              )}
            </>
            {images.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-800" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
                >
                  <ChevronRight className="w-6 h-6 text-gray-800" />
                </button>
              </>
            )}
          </LightGallery>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default MobileGallery;
