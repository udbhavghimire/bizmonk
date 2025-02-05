import { commercial } from "../api/routes/fetchRoutes";

export const generateImageURLs = (id, photoCount = 0) => {
  const images = [];

  // Only generate URLs for the actual number of photos
  for (let i = 1; i <= photoCount; i++) {
    const imgSrc = `${commercial.photos}?id=${id}&index=${i}`;
    images.push(imgSrc);
  }

  return images;
};
