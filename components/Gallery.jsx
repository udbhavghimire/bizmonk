"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useEffect } from "react";
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

const Gallery = ({ ResourceRecordKey }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const urls = await getImageUrls({ ResourceRecordKey });
        setImages(urls);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    if (ResourceRecordKey) {
      fetchImages();
    }
  }, [ResourceRecordKey]);

  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-[520px] rounded-[10px]" />;
  }

  return (
    <>
      {LightGallery ? (
        <LightGallery
          onInit={onInit}
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
          elementClassNames="grid grid-rows-3 sm:grid-rows-2 grid-cols-4 gap-2"
        >
          <>
            {images?.length > 0 ? (
              images.map((url, index) => (
                <a
                  key={index}
                  data-src={url}
                  className={`gallery-item overflow-hidden rounded-[10px] ${
                    index === 0
                      ? "row-span-2 col-span-4 sm:col-span-2 h-[240px] sm:h-[520px]"
                      : "h-[100px] sm:h-[255px]"
                  } ${index >= 5 ? "hidden" : ""}`}
                >
                  <img
                    src={url}
                    alt={`Property Image ${index + 1}`}
                    className={`w-full h-full object-cover object-center transform duration-200 hover:scale-110`}
                  />
                </a>
              ))
            ) : (
              <div className="row-span-2 col-span-4 sm:col-span-2 h-[240px] sm:h-[520px] flex  justify-center bg-gray-100 rounded-[10px]">
                <div className="flex flex-col items-center">
                  <img src="/icons/no-photo.png" className="w-10 h-10" alt="No photos" />
                  <p className="text-gray-500">No images available</p>
                </div>
              </div>
            )}
          </>
        </LightGallery>
      ) : (
        <div className="animate-pulse bg-gray-200 h-[520px] rounded-[10px]" />
      )}
    </>
  );
};

export default Gallery;
