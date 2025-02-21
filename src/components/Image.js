import React, { useState } from "react";

const Image = ({ src, alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(true);

  // Add error handling and fallback
  const handleError = () => {
    setImgSrc("/icons/no-photo.png"); // Fallback image
    setLoading(false);
  };

  return (
    <div className={`image-wrapper ${loading ? "loading" : ""}`}>
      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        onError={handleError}
        onLoad={() => setLoading(false)}
        {...props}
      />
      {loading && <div className="loading-spinner" />}
    </div>
  );
};

export default Image;
