"use client";
import { useState, useEffect } from "react";
import { getImageUrls } from "@/api/getImageUrls";
import dynamic from "next/dynamic";

const Carousel = dynamic(() => import("./Carousel"), {
  ssr: false
});

const MobileGallery = ({ ResourceRecordKey }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const urls = await getImageUrls({ ResourceRecordKey, thumbnailOnly: false });
        if (urls?.length > 0) {
          setImages(urls.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    if (ResourceRecordKey) {
      fetchImages();
    }
  }, [ResourceRecordKey]);

  if (loading) {
    return (
      <div className="block sm:hidden" suppressHydrationWarning>
        <div className="aspect-16/14 mb-2 rounded-lg overflow-hidden">
          <div className="animate-pulse bg-gray-200 w-full h-full rounded-[10px]" />
        </div>
        <div className="h-20 animate-pulse bg-gray-200 rounded-[10px]" />
      </div>
    );
  }

  if (!images?.length) {
    return (
      <div className="block sm:hidden" suppressHydrationWarning>
        <div className="aspect-16/14 mb-2 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center">
            <img src="/icons/no-photo.png" className="w-10 h-10" alt="No photos" />
            <p className="text-gray-500">No images available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="block sm:hidden" suppressHydrationWarning>
      <Carousel urls={images} />
    </div>
  );
};

export default MobileGallery;
